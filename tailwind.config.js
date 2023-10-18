/** @type {import('tailwindcss').Config} */
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      gray01: "#323438",
      gray02: "#85878C",
      gray03: "#E5E6E9",
      white: "#fff",
      green: "#00C362",
      blue: "#2196F3",
    },
    extend: {
      top: px0_100, // top, right 값은 적용되지 않음
      right: px0_100,
      width: px0_1000,
      maxWidth: px0_1000,
      height: px0_1000,
      margin: px0_1000,
      padding: px0_1000,
      border: px0_10,
      borderRadius: px0_100,
      fontSize: px0_100,
      lineHeight: px0_100,
      gap: px0_100,
      boxShadow: {
        card: "0 1px 4px 0px rgba(#1E283A, 0.04)",
      },
    },
    fontFamily: {
      noto: ["Noto Sans KR", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
