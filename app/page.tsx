import type { Metadata } from "next";
import { pickRandomRef, RECIPIENTS } from "@/lib/data";
import Landing from "@/components/Landing";

// 요청마다 랜덤 담당자를 선택해야 하므로 정적 생성하지 않는다.
export const dynamic = "force-dynamic";

// 루트가 색인 대상(정규 URL). 서브페이지는 noindex 처리된다.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  // 리드 균등 분배 — 리다이렉트 없이 랜덤 담당자로 바로 렌더 (LCP 유리)
  const ref = pickRandomRef();
  const { phone } = RECIPIENTS[ref];
  return <Landing phone={phone} refCode={ref} />;
}
