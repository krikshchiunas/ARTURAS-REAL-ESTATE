import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  align?: "left" | "center";
};

// Заголовки секций стопкой (eyebrow → headline → body), без split-header.
export function SectionHeading({ eyebrow, title, body, align = "left" }: Props) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col gap-6 ${
        isCenter ? "items-center text-center" : "items-start"
      }`}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="max-w-[18ch] font-display text-4xl font-light leading-[1.05] tracking-tight text-balance md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.1}>
          <p
            className={`max-w-prose text-pretty text-base leading-relaxed text-bone-muted md:text-lg ${
              isCenter ? "mx-auto" : ""
            }`}
          >
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
