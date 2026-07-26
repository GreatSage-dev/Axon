/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        axon: {
          bg: "#06020a",
          card: "rgba(18, 9, 31, 0.75)",
          cardHover: "rgba(28, 14, 48, 0.85)",
          border: "rgba(168, 85, 247, 0.18)",
          borderGlow: "rgba(168, 85, 247, 0.45)",
          violet: {
            400: "#c084fc",
            500: "#a855f7",
            600: "#9333ea",
            700: "#7e22ce",
            800: "#581c87",
            900: "#3b0764",
          },
          magenta: "#e879f9",
          cyan: "#38bdf8",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(168, 85, 247, 0.4)",
        glowSm: "0 0 20px -5px rgba(168, 85, 247, 0.3)",
        blade: "0 0 60px 10px rgba(168, 85, 247, 0.25)",
      },
      keyframes: {
        bladePulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1) rotate(-15deg)" },
          "50%": { opacity: "0.9", transform: "scale(1.08) rotate(-12deg)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        bladePulse: "bladePulse 8s ease-in-out infinite",
        pulseSlow: "pulseSlow 4s ease-in-out infinite",
        floatSlow: "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
