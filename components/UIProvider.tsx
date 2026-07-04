"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SuccessModal from "./SuccessModal";
import ExitModal from "./ExitModal";

type UIContextValue = {
  /** 접수 완료 모달 표시 */
  openSuccess: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within <UIProvider>");
  return ctx;
}

const EXIT_SHOWN_KEY = "daeryun_exit_shown";

export default function UIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [successOpen, setSuccessOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const interacted = useRef(false);

  const openSuccess = useCallback(() => setSuccessOpen(true), []);

  // 사용자 상호작용 감지 (이탈 방지 모달 조건)
  useEffect(() => {
    const mark = () => {
      interacted.current = true;
    };
    const events: (keyof WindowEventMap)[] = [
      "scroll",
      "click",
      "touchstart",
      "keydown",
    ];
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    return () =>
      events.forEach((e) => window.removeEventListener(e, mark));
  }, []);

  // 뒤로가기(popstate) 감지 — 모바일 이탈 방지
  useEffect(() => {
    // 뒤로가기를 가로챌 히스토리 항목을 하나 쌓아둔다
    window.history.pushState({ daeryun: true }, "");

    const onPopState = () => {
      const alreadyShown =
        sessionStorage.getItem(EXIT_SHOWN_KEY) === "1";
      if (interacted.current && !alreadyShown) {
        sessionStorage.setItem(EXIT_SHOWN_KEY, "1");
        // 다시 트랩 항목을 쌓아 실제 이탈을 막고 모달 노출
        window.history.pushState({ daeryun: true }, "");
        setExitOpen(true);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <UIContext.Provider value={{ openSuccess }}>
      {children}
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
      <ExitModal open={exitOpen} onClose={() => setExitOpen(false)} />
    </UIContext.Provider>
  );
}
