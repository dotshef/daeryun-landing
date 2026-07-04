import { SECTIONS } from "@/lib/constants";
import UIProvider from "@/components/UIProvider";
import Ticker from "@/components/Ticker";
import SectionImage from "@/components/SectionImage";
import Faq from "@/components/Faq";
import TrustBar from "@/components/TrustBar";
import ApplyForm from "@/components/ApplyForm";
import QuickBar from "@/components/QuickBar";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  // 이미지 01~10은 연속 배치, FAQ는 10과 11 사이, 11 뒤에 신뢰배지 → 신청 폼
  const first10 = SECTIONS.slice(0, 10);
  const section11 = SECTIONS[10];

  return (
    <UIProvider>
      <Ticker />

      <main className="mx-auto w-full max-w-[480px] bg-white">
        {/* 이미지 01~10 (사이 요소 없이 연속) */}
        {first10.map((s, i) => (
          <SectionImage key={s.src} data={s} index={i} priority={i === 0} />
        ))}

        {/* FAQ 아코디언 */}
        <Faq />

        {/* 이미지 11 — 최종 CTA (앵커) */}
        <SectionImage data={section11} index={10} />

        {/* 신뢰 배지 바 */}
        <TrustBar />

        {/* 본문 유일 신청 폼 */}
        <ApplyForm />

        {/* 하단 고정 퀵바에 콘텐츠가 가리지 않도록 여백 (폼과 같은 배경으로 이어지게) */}
        <div className="h-28 bg-slate-900" aria-hidden />
      </main>

      <FloatingButtons />
      <QuickBar />
    </UIProvider>
  );
}
