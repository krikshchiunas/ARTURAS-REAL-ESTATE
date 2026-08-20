import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Однотоновая тёмно-синяя система. Всё строится на night + offwhite
        // с альфами; royal — единственный акцент (глубина и свечение).
        night: {
          DEFAULT: "#020a19",
          raised: "#0c1524",
        },
        offwhite: "#d5e0ff",
        royal: "#052261",
      },
      // Пиксель-именованная шкала (text-140 = 140px в rem): гигантская
      // uppercase-типографика. Межстрочные задаются отдельно через leading-* —
      // у дисплея и текста они радикально разные.
      fontSize: {
        "9": "0.5625rem",
        "10": "0.625rem",
        "11": "0.6875rem",
        "12": "0.75rem",
        "13": "0.8125rem",
        "14": "0.875rem",
        "16": "1rem",
        "18": "1.125rem",
        "20": "1.25rem",
        "24": "1.5rem",
        "30": "1.875rem",
        "32": "2rem",
        "40": "2.5rem",
        "48": "3rem",
        "54": "3.375rem",
        "56": "3.5rem",
        "104": "6.5rem",
        "110": "6.875rem",
        "120": "7.5rem",
        "140": "8.75rem",
        "160": "10rem",
        "180": "11.25rem",
        "320": "20rem",
      },
      lineHeight: {
        "0.8": "0.8",
        "0.9": "0.9",
        "1.1": "1.1",
        "1.2": "1.2",
        "1.6": "1.6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        // tracking-4 — mono-подписи HUD, tracking-2 — плотный лайт-текст.
        "2": "0.02em",
        "4": "0.04em",
      },
      transitionTimingFunction: {
        // Единая кривая для всего UI.
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
