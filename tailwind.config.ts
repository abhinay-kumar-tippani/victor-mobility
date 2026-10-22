import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#31326F",
          blue: "#2D5090",
          violet: "#6E57A0",
          ink: "#15162F",
          "warm-white": "#F6F5F2",
          warmWhite: "#F6F5F2",
          white: "#FFFFFF",
          "soft-neutral": "#E5E4EA",
          softNeutral: "#E5E4EA",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans, 'Manrope')",
          "Manrope",
          "var(--font-arabic, 'IBM Plex Sans Arabic')",
          "'IBM Plex Sans Arabic'",
          "'Noto Sans Arabic'",
          "'Noto Sans Devanagari'",
          "'Noto Sans Telugu'",
          "'Nirmala UI'",
          "'Kohinoor Devanagari'",
          "'Kohinoor Telugu'",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
        arabic: [
          "var(--font-arabic, 'IBM Plex Sans Arabic')",
          "'IBM Plex Sans Arabic'",
          "'Noto Sans Arabic'",
          "'Segoe UI'",
          "Tahoma",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
