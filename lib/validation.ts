// 전화번호·이름 검증/포맷 — 클라이언트·서버 공용 순수 유틸(단일 소스).
// 폼(lib/form.ts)과 API(app/api/apply/route.ts)가 동일 로직을 공유한다.

/** 숫자만 추출 */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * 한국 전화번호 하이픈 자동 포맷.
 * - 02(서울 지역번호): 2-3-4 / 2-4-4
 * - 그 외(010, 011, 031 등 3자리 국번): 3-3-4(10자리) / 3-4-4(11자리)
 */
export function formatPhone(value: string): string {
  const d = digitsOnly(value).slice(0, 11);

  // 서울 지역번호(02)는 국번이 2자리
  if (d.startsWith("02")) {
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6)}`; // 02-xxxx-xxxx
  }

  if (d.length < 4) return d;
  if (d.length < 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`; // 3-3-4
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`; // 3-4-4
}

/** 0으로 시작하는 10~11자리 전화번호(휴대폰·유선 포함) */
export function isValidPhone(value: string): boolean {
  return /^0\d{9,10}$/.test(digitsOnly(value));
}

/** 이름: 공백 제외 2자 이상 */
export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}
