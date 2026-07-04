"use client";

import Modal from "./Modal";

/** 이탈 방지 모달 — 뒤로가기 감지 시 1회 표시, 폼으로 유도 */
export default function ExitModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const goToForm = () => {
    onClose();
    document
      .getElementById("apply-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="exit-title">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
        🚨
      </div>
      <h2 id="exit-title" className="text-xl font-extrabold text-slate-900">
        잠깐만요!
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        지금 나가시면 이 이벤트 신청이 불가합니다.
        <br />
        <span className="font-semibold text-red-600">수리비 0원</span> 혜택,
        30초면 접수됩니다.
      </p>
      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={goToForm}
          className="w-full rounded-xl bg-red-600 py-3.5 text-base font-bold text-white"
        >
          무료로 신청하기
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 text-sm text-slate-400"
        >
          괜찮아요, 나갈게요
        </button>
      </div>
    </Modal>
  );
}
