"use client";

import { useState } from "react";
import { useUI } from "./UIProvider";
import {
  formatPhone,
  isValidName,
  isValidPhone,
  submitApply,
} from "@/lib/form";

type Errors = { name?: string; phone?: string; consent?: string };

/** 본문 최하단 신청 폼 (#apply-form) — 페이지 내 유일한 신청 폼 */
export default function ApplyForm() {
  const { openSuccess, refCode } = useUI();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [car, setCar] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!isValidName(name)) e.name = "이름을 정확히 입력해주세요.";
    if (!isValidPhone(phone))
      e.phone = "연락처를 정확히 입력해주세요. (10~11자리)";
    if (!consent) e.consent = "개인정보 수집·이용에 동의해주세요.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    const ok = await submitApply({
      name: name.trim(),
      phone,
      car: car.trim() || undefined,
      source: "form",
      ref: refCode,
    });
    setSubmitting(false);

    if (ok) {
      openSuccess();
      setName("");
      setPhone("");
      setCar("");
      setConsent(false);
      setErrors({});
    } else {
      setErrors({ phone: "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
    }
  };

  return (
    <section
      id="apply-form"
      className="scroll-mt-4 bg-slate-900 px-5 py-10"
      aria-label="무료 수리 신청"
    >
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-white">
          무료 수리 신청하기
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          30초만에 간편 접수, 빠른 상담 연결!
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <Field label="이름" required error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            autoComplete="name"
            className={inputCls(!!errors.name)}
          />
        </Field>

        <Field label="연락처" required error={errors.phone}>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="010-0000-0000"
            autoComplete="tel"
            className={inputCls(!!errors.phone)}
          />
        </Field>

        <Field label="차종" error={undefined}>
          <input
            type="text"
            value={car}
            onChange={(e) => setCar(e.target.value)}
            placeholder="예: 아반떼, BMW 320 (모르시면 비워두세요)"
            className={inputCls(false)}
          />
        </Field>

        <ConsentBox
          checked={consent}
          onChange={setConsent}
          error={errors.consent}
        />

        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full rounded-xl bg-red-600 py-4 text-lg font-extrabold text-white shadow-lg transition active:scale-[0.99] disabled:opacity-60"
        >
          {submitting ? "접수 중…" : "지금 바로 무료 접수하기"}
        </button>
        <p className="text-center text-xs text-slate-400">
          접수 후 5분 이내 전문 상담사가 연락드립니다.
        </p>
      </form>
    </section>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-brand-light ${
    hasError ? "border-red-500" : "border-slate-300"
  }`;
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-semibold text-slate-200">
        {label}
        {required && <span className="text-red-400">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

/** 개인정보 수집·이용 동의 안내 + 체크박스 (본문 폼 내부 전용) */
function ConsentBox({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="rounded-lg bg-slate-800 p-3 text-[11px] leading-relaxed text-slate-300">
        <p className="mb-1 font-semibold text-slate-200">
          개인정보 수집·이용 동의
        </p>
        <ul className="list-disc space-y-0.5 pl-4">
          <li>수집항목: 이름, 연락처, 차종</li>
          <li>이용목적: 수리 상담 및 견적 안내</li>
          <li>보유기간: 상담 종료 후 3개월</li>
          <li>
            수집·이용에 거부할 수 있으며, 거부 시 상담이 불가합니다.
          </li>
        </ul>
      </div>
      <label className="mt-2 flex items-center gap-2 text-sm text-slate-200">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-red-600"
        />
        <span>
          <span className="text-red-400">[필수]</span> 개인정보 수집·이용에
          동의합니다.
        </span>
      </label>
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </div>
  );
}
