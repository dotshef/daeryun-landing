import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { REFS, getRecipient } from "@/lib/data";
import Landing from "@/components/Landing";

// js/yj/jh 만 정적 생성하고, 그 외 경로는 404
export const dynamicParams = false;

export function generateStaticParams() {
  return REFS.map((ref) => ({ ref }));
}

// 서브페이지는 루트와 콘텐츠가 동일 → 중복 색인 방지: noindex + 루트로 canonical
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default async function VariantPage({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  const recipient = getRecipient(ref);
  if (!recipient) notFound();
  return <Landing phone={recipient.phone} refCode={ref} />;
}
