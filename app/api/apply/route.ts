import { NextResponse } from "next/server";

/**
 * 신청 폼 제출 처리.
 *
 * 오픈 이슈(발주처 확인 필요): 최종 수신 채널 미정.
 * 1차 배포는 서버 콘솔 로깅으로 시작하고, 아래 옵션을 환경변수로 켜서 확장한다.
 *   - APPLY_WEBHOOK_URL : 텔레그램/슬랙/카톡 알림 등 웹훅 POST
 * 채널 확정 후 여기서 이메일/시트/알림 연동을 추가하면 된다.
 */

type Body = {
  name?: unknown;
  phone?: unknown;
  car?: unknown;
  source?: unknown;
};

const isValidPhone = (v: string) => /^010\d{8}$/.test(v.replace(/\D/g, ""));

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

  if (name.length < 2 || !isValidPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "validation_failed" },
      { status: 422 }
    );
  }

  const lead = {
    name,
    phone,
    car: car || null,
    source,
    receivedAt: new Date().toISOString(),
    ua: req.headers.get("user-agent") ?? null,
  };

  // 1차: 서버 로깅 (Vercel 로그에서 확인 가능)
  console.log("[apply] new lead", JSON.stringify(lead));

  // 선택: 웹훅으로 실시간 알림 전달
  const webhook = process.env.APPLY_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      // 알림 실패가 접수 자체를 실패시키지 않도록 로깅만 한다
      console.error("[apply] webhook failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
