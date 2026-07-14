import type { Metadata } from "next";
import { RECIPIENTS } from "@/lib/data";
import Landing from "@/components/Landing";

// 루트가 색인 대상(정규 URL). 서브페이지는 noindex 처리된다.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  // 대표 페이지는 js(준성)를 흡수 — 루트 문의는 항상 준성에게 발송
  const ref = "js";
  const { phone } = RECIPIENTS[ref];
  return <Landing phone={phone} refCode={ref} />;
}
