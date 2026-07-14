import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 색인 대상은 루트(/)뿐. /yj 등 담당자별 서브페이지는 페이지 자체에서 noindex 처리된다.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
