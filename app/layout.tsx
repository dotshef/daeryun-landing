import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const SITE_TITLE = "대륜 1급 공업사 | 사고 수리비 0원 이벤트";
const SITE_DESC =
  "자차보험만 있으면 긁힌 차·찌그러진 차·부서진 차 수리비 0원! 서울·경기·인천 무료 탁송. 1급 공업사 대륜에서 자기부담금까지 지원해드립니다. 30초 간편 접수.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/images/section-01.webp", width: 1000, height: 1280 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1b3a8c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full bg-slate-200">{children}</body>
    </html>
  );
}
