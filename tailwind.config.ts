import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#081225",
        muted: "#5b677c",
        line: "#dfe7f2",
        blue: "#2563eb",
        sky: "#eaf4ff",
      },
      boxShadow: {
        card: "0 18px 60px rgba(30, 74, 135, 0.10)",
        float: "0 24px 80px rgba(37, 99, 235, 0.18)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["var(--font-body)", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Inter Tight", "Helvetica Neue", "Arial", "sans-serif"],
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        float: "float 5s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37,99,235,.18)" },
          "50%": { boxShadow: "0 0 0 10px rgba(37,99,235,0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
