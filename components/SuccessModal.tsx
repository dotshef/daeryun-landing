"use client";

import Modal from "./Modal";

/** 접수 완료 모달 — 폼/퀵바 제출 성공 시 표시 */
export default function SuccessModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="success-title">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <svg viewBox="0 0 24 24" className="h-9 w-9 stroke-green-600" fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h2 id="success-title" className="text-xl font-extrabold text-slate-900">
        접수가 완료되었습니다
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        곧 연락드리겠습니다.
        <br />
        접수 후 5분 이내 전문 상담사가 연락드립니다.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 w-full rounded-xl bg-brand py-3.5 text-base font-bold text-white"
      >
        확인
      </button>
    </Modal>
  );
}
