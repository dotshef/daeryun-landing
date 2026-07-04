// 대륜 1급 공업사 랜딩 — 전역 상수 데이터
// 오픈 이슈(발주처 확인 필요) 값은 환경변수로도 덮어쓸 수 있게 처리한다.

/** 전화 상담 번호 (tel: 링크용). 실제 번호로 교체 필요 */
export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "1600-0000";

/** 브랜드명 */
export const BRAND = "대륜";

export type SectionImage = {
  /** public/images 하위 파일명 */
  src: string;
  /** 접근성/SEO용 대체 텍스트 (섹션 핵심 카피) */
  alt: string;
  /** 클릭 시 신청 폼으로 이동하는 앵커 섹션 여부 */
  anchor?: boolean;
};

/** 섹션 이미지 01~11 (레퍼런스 순서 그대로) */
export const SECTIONS: SectionImage[] = [
  {
    src: "/images/section-01.webp",
    alt: "사고나셨나요? 걱정마세요! 긁힌 차, 찌그러진 차, 부서진 차 수리비 0원! 자기부담금 저희가 내드립니다.",
  },
  {
    src: "/images/section-02.webp",
    alt: "차종 무관 — 자차보험만 있으면 0원 수리, 수리 전/후 비교",
  },
  {
    src: "/images/section-03.webp",
    alt: "자차보험 할증 걱정 해소 — 할증 없이 완벽 복원",
  },
  {
    src: "/images/section-04.webp",
    alt: "1급 공업사 확장기념 — 선착순 10분만 수리비 0원, 지금 신청하기",
    anchor: true,
  },
  {
    src: "/images/section-05.webp",
    alt: "보험 담당자 말만 믿고 수리 보냈더니… 문제 제기",
  },
  {
    src: "/images/section-06.webp",
    alt: "대륜은 다릅니다 — 차별점 4가지",
  },
  {
    src: "/images/section-07.webp",
    alt: "수리 과정 4 STEP — 1급 공업사 인증",
  },
  {
    src: "/images/section-08.webp",
    alt: "고객 만족 — 실제 카카오톡 후기",
  },
  {
    src: "/images/section-09.webp",
    alt: "카카오톡 후기 상세 — 실제 고객 대화 캡처",
  },
  {
    src: "/images/section-10.webp",
    alt: "편리한 탁송 지원 — 서울·경기·인천 무료 탁송",
  },
  {
    src: "/images/section-11.webp",
    alt: "수리비 0원! 지금 바로 신청하세요 — 신청 자격 3가지",
    anchor: true,
  },
];

export type TickerItem = { name: string; car: string; minutesAgo: number };

/** 실시간 접수 티커 목업 데이터 (이름 마스킹) */
export const TICKER_ITEMS: TickerItem[] = [
  { name: "김○○", car: "소나타", minutesAgo: 3 },
  { name: "이○○", car: "그랜저", minutesAgo: 5 },
  { name: "박○○", car: "아반떼", minutesAgo: 7 },
  { name: "최○○", car: "BMW 320", minutesAgo: 9 },
  { name: "정○○", car: "K5", minutesAgo: 12 },
  { name: "강○○", car: "카니발", minutesAgo: 14 },
  { name: "조○○", car: "벤츠 E220", minutesAgo: 17 },
  { name: "윤○○", car: "쏘렌토", minutesAgo: 21 },
  { name: "장○○", car: "투싼", minutesAgo: 24 },
  { name: "임○○", car: "아우디 A6", minutesAgo: 28 },
  { name: "한○○", car: "레이", minutesAgo: 33 },
  { name: "오○○", car: "티볼리", minutesAgo: 38 },
];

export type FaqItem = { q: string; a: string };

/** FAQ 6문항 (레퍼런스 원문, 브랜드명만 대륜으로 교체) */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "정말 수리비가 0원인가요?",
    a: "네, 자차보험 가입자 중 서울/경기/인천 거주자, 파손된 차량 보유자에 해당되시면 자기부담금 포함 수리비 전액을 지원해드립니다.",
  },
  {
    q: "자차보험 쓰면 내년에 할증 붙지 않나요?",
    a: "'물적사고 할증기준 금액' 안에서 수리하면 보험료 할증이 발생하지 않습니다. 대륜은 할증기준 안에서 완벽 복원 가능하도록 견적을 설계해드립니다. 상담 시 고객님 가입 보험의 할증기준을 함께 확인해드립니다.",
  },
  {
    q: "어떤 차종이든 가능한가요?",
    a: "국산차, 수입차 모두 가능합니다. 차종과 파손 정도에 따라 상담 후 안내드립니다.",
  },
  {
    q: "탁송은 어떻게 진행되나요?",
    a: "서울, 경기, 인천 지역은 편도 무료 탁송을 지원합니다. 전화 한 통이면 차량 픽업부터 수리 완료 후 배송까지 모두 처리해드립니다.",
  },
  {
    q: "수리 기간은 얼마나 걸리나요?",
    a: "파손 정도에 따라 다르지만, 일반적으로 3~5일 이내에 완료됩니다. 꼼꼼한 검수 후 출고해드립니다.",
  },
  {
    q: "이 이벤트는 언제까지인가요?",
    a: "1급 공업사 확장 기념 이벤트로, 선착순 마감입니다. 조기 마감될 수 있으니 빠른 접수를 권장드립니다.",
  },
];

export type TrustBadge = { highlight: string; label: string };

/** 신뢰 배지 바 4개 */
export const TRUST_BADGES: TrustBadge[] = [
  { highlight: "1급", label: "공업사 인증" },
  { highlight: "20년+", label: "수리 경력" },
  { highlight: "100%", label: "고객 만족" },
  { highlight: "0원", label: "수리비" },
];
