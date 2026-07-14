import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { REFS, getRecipient } from "@/lib/data";
import Landing from "@/components/Landing";

export const dynamicParams = false;

// js(준성)는 대표 페이지(루트)로 흡수됨 → /js 서브페이지는 없앤다(404).
export function generateStaticParams() {
  return REFS.filter((ref) => ref !== "js").map((ref) => ({ ref }));
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
