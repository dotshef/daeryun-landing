import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getRecipient, REFS, type Recipient } from "@/lib/data";
import { isValidName, isValidPhone } from "@/lib/validation";

type Body = {
  name?: unknown;
  phone?: unknown;
  car?: unknown;
  source?: unknown;
  ref?: unknown;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const car = typeof body.car === "string" ? body.car.trim() : "";
  const source = body.source === "quickbar" ? "quickbar" : "form";
  const ref = typeof body.ref === "string" ? body.ref : "";

  if (!isValidName(name) || !isValidPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 422 }
    );
  }

  // ref 가 유효하지 않아도 리드를 잃지 않도록 기본 담당자로 폴백
  const recipient: Recipient = getRecipient(ref) ?? getRecipient(REFS[0])!;

  const lead = {
    name,
    phone,
    car: car || null,
    source,
    ref: ref || REFS[0],
    assignedTo: recipient.name,
    receivedAt: new Date().toISOString(),
    ua: req.headers.get("user-agent") ?? null,
  };

  // 항상 서버 로깅 (이메일 실패 시에도 리드 유실 방지)
  console.log("[apply] new lead", JSON.stringify(lead));

  await sendMail(recipient, lead);

  return NextResponse.json({ ok: true });
}

async function sendMail(recipient: Recipient, lead: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[apply] RESEND_API_KEY 미설정 — 이메일 발송 생략(로깅만)");
    return;
  }

  const from = process.env.RESEND_FROM ?? "Resend <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: recipient.email,
      subject: `[대륜 모터스 고객 접수] ${lead.name} / ${lead.phone}`,
      text: [
        `담당자: ${recipient.name}`,
        `이름: ${lead.name}`,
        `연락처: ${lead.phone}`,
        `차종: ${lead.car ?? "-"}`,
        `유입경로: ${lead.source} (${lead.ref})`,
        `접수시각: ${lead.receivedAt}`,
      ].join("\n"),
    });

    if (error) {
      console.error(
        `[apply] resend error: ${error.name} - ${error.message}`
      );
      return;
    }
    console.log(`[apply] email sent id=${data?.id} to=${recipient.email}`);
  } catch (err) {
    // 네트워크 등 예외
    console.error("[apply] resend threw", err);
  }
}
