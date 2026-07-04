import Image from "next/image";
import type { SectionImage as SectionImageData } from "@/lib/constants";

/**
 * 섹션 이미지 공통 래퍼. 모든 원본은 1000x1280.
 * anchor=true 이면 클릭 시 #apply-form 으로 스크롤되는 링크로 감싼다.
 * priority=true 는 히어로(첫 이미지) LCP 최적화용.
 */
export default function SectionImage({
  data,
  index,
  priority = false,
}: {
  data: SectionImageData;
  index: number;
  priority?: boolean;
}) {
  const img = (
    <Image
      src={data.src}
      alt={data.alt}
      width={1000}
      height={1280}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes="(max-width: 480px) 100vw, 480px"
      className="block w-full h-auto"
    />
  );

  if (data.anchor) {
    return (
      <a
        href="#apply-form"
        aria-label={`${data.alt} — 신청 폼으로 이동`}
        className="block"
      >
        {img}
      </a>
    );
  }

  return <div data-section={index + 1}>{img}</div>;
}
