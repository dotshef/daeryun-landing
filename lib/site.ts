// 사이트 전역 URL·업체 정보 — layout / robots / sitemap / 구조화 데이터가 공유한다.
// 커스텀 도메인 확정 시 SITE_URL 한 줄만 교체하면 전 파일에 반영된다.

export const SITE_URL = "https://www.drmfix.com";

/** 구조화 데이터(JSON-LD)용 업체 정보 */
export const BUSINESS = {
  name: "대륜 1급 공업사",
  description:
    "자차보험만 있으면 긁힌 차·찌그러진 차·부서진 차 수리비 0원. 서울·경기·인천 무료 탁송, 1급 공업사 자동차 사고 수리 전문.",
  // 서비스 제공 지역 (로컬 SEO)
  areaServed: ["서울특별시", "경기도", "인천광역시"],
} as const;
