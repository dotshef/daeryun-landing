"use client";

import { PHONE_NUMBER } from "@/lib/constants";

/**
 * 우측 하단 플로팅 전화 상담 버튼.
 * 하단 퀵 접수 바(약 88px)에 가리지 않도록 위쪽으로 띄운다.
 */
export default function FloatingButtons() {
  const telHref = `tel:${PHONE_NUMBER.replace(/[^0-9+]/g, "")}`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="relative mx-auto h-0 w-full max-w-[480px]">
        <div className="pointer-events-auto absolute bottom-[104px] right-3 flex flex-col items-end gap-3">
          {/* 전화 상담 */}
          <a
            href={telHref}
            aria-label="전화 상담"
            style={{ "--pulse-color": "rgba(34, 197, 94, 0.55)" } as React.CSSProperties}
            className="animate-pulse-ring relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg"
          >
            <span className="absolute right-full mr-2 hidden whitespace-nowrap rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white sm:block">
              전화 상담
            </span>
            <PhoneIcon />
            <span className="sr-only">전화 상담</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 fill-white"
      aria-hidden
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.3 21 3 13.7 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z" />
    </svg>
  );
}
