// 신청 폼 공통 유틸 — 제출 처리.
// 검증/포맷 로직은 lib/validation.ts(클라이언트·서버 공용)에 있으며, 편의를 위해 재노출한다.

export { formatPhone, isValidPhone, isValidName } from "./validation";

export type ApplyPayload = {
  name: string;
  phone: string;
  car?: string;
  source: "form" | "quickbar";
  /** 수신 담당자 식별자 (js/yj/jh/cw/sj) */
  ref: string;
};

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
