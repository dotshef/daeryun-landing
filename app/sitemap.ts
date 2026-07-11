import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 정규 URL은 루트 하나뿐(서브페이지는 noindex + canonical "/").
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
