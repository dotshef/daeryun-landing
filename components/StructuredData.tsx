import { FAQ_ITEMS } from "@/lib/constants";
import { SITE_URL, BUSINESS } from "@/lib/site";

/**
 * JSON-LD 구조화 데이터.
 * - AutoRepair(LocalBusiness): 지역 검색·지식패널용 업체 정보
 * - FAQPage: 검색 결과 리치 스니펫(아코디언)용 Q&A
 * 화면에는 렌더되지 않으며 크롤러만 읽는다.
 */
export default function StructuredData() {
  const graph = [
    {
      "@type": "AutoRepair",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS.name,
      description: BUSINESS.description,
      url: SITE_URL,
      areaServed: BUSINESS.areaServed.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      priceRange: "무료 상담",
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // 콘텐츠는 정적 상수라 XSS 위험 없음
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
