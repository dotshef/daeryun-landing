import { TRUST_BADGES } from "@/lib/constants";

/** 신뢰 배지 바 — 4개 배지, 신청 폼 직전 배치 */
export default function TrustBar() {
  return (
    <section
      className="bg-brand px-4 py-6"
      aria-label="대륜 신뢰 지표"
    >
      <ul className="grid grid-cols-4 gap-2">
        {TRUST_BADGES.map((b, i) => (
          <li
            key={i}
            className="flex flex-col items-center justify-center gap-1 text-center"
          >
            <span className="text-xl font-extrabold leading-none text-yellow-300 sm:text-2xl">
              {b.highlight}
            </span>
            <span className="text-[11px] font-medium leading-tight text-white/90 sm:text-xs">
              {b.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
