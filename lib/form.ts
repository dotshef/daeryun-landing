// 신청 폼 공통 유틸 — 전화번호 포맷/검증, 제출

export type ApplyPayload = {
  name: string;
  phone: string;
  car?: string;
  source: "form" | "quickbar";
};

/** 숫자만 남기고 010-0000-0000 형태로 하이픈 자동 삽입 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

/** 010으로 시작하는 11자리 휴대폰 번호인지 검증 */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return /^010\d{8}$/.test(digits);
}

/** 이름: 공백 제외 2자 이상 */
export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}

/** /api/apply 로 제출. 성공 여부 반환 */
export async function submitApply(payload: ApplyPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
