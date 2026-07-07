import type { MetadataRoute } from "next";

// 정규 URL은 루트 하나뿐(서브페이지는 noindex + canonical "/").
const BASE_URL = "https://daeryun-landing.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
