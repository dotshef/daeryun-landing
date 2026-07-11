import "server-only";

export type Ref = "js" | "yj" | "jh" | "cw";

export type Recipient = { name: string; phone: string; email: string };

// 전화·이메일은 코드에 직접 명시(env 오버라이드 없음).
// env로 주입하는 값은 RESEND_API_KEY, RESEND_FROM 둘뿐이며 /api/apply 에서 읽는다.
export const RECIPIENTS: Record<Ref, Recipient> = {
  js: {
    name: "준성",
    phone: "010-3886-5990",
    email: "toy-wang@naver.com",
  },
  yj: {
    name: "윤정",
    phone: "010-4106-4956",
    email: "yunjeong4956@naver.com",
  },
  jh: {
    name: "지혜",
    phone: "010-7538-9455",
    email: "similan_@naver.com",
  },
  cw: {
    name: "채원",
    phone: "010-3200-5990",
    email: "althgksahrma@naver.com",
  },
};

export const REFS = Object.keys(RECIPIENTS) as Ref[];

export function isRef(v: string): v is Ref {
  return (REFS as string[]).includes(v);
}

export function getRecipient(ref: string): Recipient | null {
  return isRef(ref) ? RECIPIENTS[ref] : null;
}

export function pickRandomRef(): Ref {
  return REFS[Math.floor(Math.random() * REFS.length)];
}
