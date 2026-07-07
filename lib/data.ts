import "server-only";

export type Ref = "js" | "yj" | "jh" | "cw";

export type Recipient = { name: string; phone: string; email: string };

export const RECIPIENTS: Record<Ref, Recipient> = {
  js: {
    name: "준성",
    phone: process.env.PHONE_JS ?? "010-3886-5990",
    email: process.env.EMAIL_JS ?? "toy-wang@naver.com",
  },
  yj: {
    name: "윤정",
    phone: process.env.PHONE_YJ ?? "010-4106-4956",
    email: process.env.EMAIL_YJ ?? "yunjeong4956@naver.com",
  },
  jh: {
    name: "지혜",
    phone: process.env.PHONE_JH ?? "010-7538-9455",
    email: process.env.EMAIL_JH ?? "similan_@naver.com",
  },
  cw: {
    name: "채원",
    phone: process.env.PHONE_CW ?? "010-3200-5990",
    email: process.env.EMAIL_CW ?? "althgksahrma@naver.com",
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
