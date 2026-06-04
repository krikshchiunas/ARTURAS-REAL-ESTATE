import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Монохромная luxury-палитра. Сознательный отказ от бежево-латунного клише.
        ink: {
          DEFAULT: "#08080A", // основной off-black фон
          900: "#0B0B0E",
          800: "#101013",
          700: "#16161A",
        },
        bone: {
          DEFAULT: "#F2F2F0", // off-white основной текст
          muted: "#9A9A9F", // приглушённый текст
          faint: "#6A6A70", // самый тихий уровень
        },
        // Единственный «живой» акцент: тёплый платиновый, низкая насыщенность (<80%).
        platinum: {
          DEFAULT: "#CBB89B",
          soft: "#E3D6C2",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      maxWidth: {
        shell: "1440px",
        prose: "65ch",
      },
      borderRadius: {
        bezel: "1.75rem",
        core: "calc(1.75rem - 0.375rem)",
      },
      transitionTimingFunction: {
        // Единая кривая для всего UI.
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
        glass: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      boxShadow: {
        bezel: "0 30px 80px -20px rgba(0,0,0,0.7)",
        "inner-hi": "inset 0 1px 0 rgba(255,255,255,0.10)",
        glow: "0 0 80px -20px rgba(203,184,155,0.25)",
      },
      keyframes: {
        "grain-shift": {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-3%,-4%)" },
          "30%": { transform: "translate(2%,-2%)" },
          "50%": { transform: "translate(-1%,3%)" },
          "70%": { transform: "translate(3%,1%)" },
          "90%": { transform: "translate(-2%,2%)" },
        },
        // Едва заметный медленный дрейф амбиентных свечений фона.
        "ambient-a": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.85" },
          "50%": { transform: "translate3d(4%,3%,0) scale(1.09)", opacity: "1" },
        },
        "ambient-b": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1.06)", opacity: "0.8" },
          "50%": { transform: "translate3d(-3%,-4%,0) scale(1)", opacity: "1" },
        },
      },
      animation: {
        "grain-shift": "grain-shift 8s steps(6) infinite",
        "ambient-a": "ambient-a 24s ease-in-out infinite",
        "ambient-b": "ambient-b 30s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
