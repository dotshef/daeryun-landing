"use client";

import { useState } from "react";
import { useUI } from "./UIProvider";
import {
  formatPhone,
  isValidName,
  isValidPhone,
  submitApply,
} from "@/lib/form";

/** 하단 고정 퀵 접수 바 — 스크롤 내내 따라다니는 간편 접수 */
export default function QuickBar() {
  const { openSuccess } = useUI();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!consent) return setError("개인정보 수집·이용에 동의해주세요.");
    if (!isValidName(name)) return setError("이름을 입력해주세요.");
    if (!isValidPhone(phone))
      return setError("연락처를 정확히 입력해주세요.");

    setError(null);
    setSubmitting(true);
    const ok = await submitApply({
      name: name.trim(),
      phone,
      source: "quickbar",
    });
    setSubmitting(false);

    if (ok) {
      openSuccess();
      setName("");
      setPhone("");
      setConsent(false);
    } else {
      setError("접수 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <form
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-[480px] bg-slate-900/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur"
      >
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-[11px] text-slate-200">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="h-3.5 w-3.5 accent-red-600"
            />
            <span className="text-red-400">[필수]</span> 개인정보 수집·이용 동의
          </label>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            autoComplete="name"
            className="w-[26%] rounded-md border border-slate-600 bg-white px-2.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="010-0000-0000"
            autoComplete="tel"
            className="min-w-0 flex-1 rounded-md border border-slate-600 bg-white px-2.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="shrink-0 rounded-md bg-red-600 px-3 py-2.5 text-sm font-bold text-white disabled:opacity-60"
          >
            {submitting ? "…" : "무료 접수하기"}
          </button>
        </div>
        {error && (
          <p className="mt-1 text-center text-[11px] text-red-400">{error}</p>
        )}
      </form>
    </div>
  );
}
