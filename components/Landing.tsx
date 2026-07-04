import { SECTIONS } from "@/lib/constants";
import UIProvider from "./UIProvider";
import Ticker from "./Ticker";
import SectionImage from "./SectionImage";
import Faq from "./Faq";
import TrustBar from "./TrustBar";
import ApplyForm from "./ApplyForm";
import QuickBar from "./QuickBar";
import FloatingButtons from "./FloatingButtons";

/**
 * 랜딩 페이지 뷰(공통) — 콘텐츠는 모든 버전 동일.
 * 담당자별로 다른 것은 phone(표시·tel:)과 refCode(제출 시 수신 담당자 식별)뿐이며
 * 둘 다 상위 라우트에서 prop 으로 주입된다. 이 컴포넌트는 단 하나만 존재한다.
 */
export default function Landing({
  phone,
  refCode,
}: {
  phone: string;
  refCode: string;
}) {
  const first10 = SECTIONS.slice(0, 10);
  const section11 = SECTIONS[10];

  return (
    <UIProvider phone={phone} refCode={refCode}>
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
