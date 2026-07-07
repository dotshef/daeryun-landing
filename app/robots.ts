import type { MetadataRoute } from "next";

// 색인 대상은 루트(/)뿐. /js·/yj 등 담당자별 서브페이지는 페이지 자체에서 noindex 처리된다.
const BASE_URL = "https://daeryun-landing.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
