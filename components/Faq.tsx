"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";

/** FAQ 아코디언 — 여러 개 동시 열림 허용, +/− 아이콘 토글 */
export default function Faq() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <section className="bg-white px-5 py-10" aria-label="자주 묻는 질문">
      <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-900">
        자주 묻는 질문
      </h2>
      <ul className="flex flex-col gap-2.5">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open.has(i);
          return (
            <li
              key={i}
              className="overflow-hidden rounded-xl border border-slate-200"
            >
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 bg-slate-50 px-4 py-4 text-left"
              >
                <span className="flex items-start gap-2 text-[15px] font-semibold text-slate-900">
                  <span className="text-brand-light">Q.</span>
                  {item.q}
                </span>
                <span
                  className="shrink-0 text-xl font-bold text-brand-light"
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 py-4 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
