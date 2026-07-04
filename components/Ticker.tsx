"use client";

import { TICKER_ITEMS } from "@/lib/constants";

/**
 * 실시간 접수 티커 — 최상단.
 * 접수 내역이 좌로 무한 롤링. 목록을 2배로 이어붙여 끊김 없는 루프를 만든다.
 */
export default function Ticker() {
  const loop = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full max-w-[480px] mx-auto bg-slate-900 text-white overflow-hidden">
      <div className="flex items-center h-9">
        <div className="flex shrink-0 items-center gap-1.5 px-3 h-full bg-slate-900 text-xs font-bold">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          실시간 접수
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max whitespace-nowrap animate-ticker">
            {loop.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-4 text-xs text-slate-200"
              >
                <span className="font-semibold text-white">{item.name}</span>
                님 {item.car} 접수
                <span className="text-red-400">{item.minutesAgo}분 전</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
