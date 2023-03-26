/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: "#fafafa",
        dark: "#222222",
        neutral: {
          50: "#fafafa",
          100: "#f1f1f1",
          200: "#e0e0e0",
          300: "#cbcbcb",
          400: "#999999",
          500: "#6a6a6a",
          600: "#4c4c4c",
          700: "#393939",
          800: "#222222",
          900: "#181818",
        },
        primary: {
          DEFAULT: "#2196f3",
          50: "#f2f8ff",
          100: "#e0eefd",
          200: "#b9dffe",
          300: "#80c9ff",
          400: "#42b0ff",
          500: "#2196f3",
          600: "#2778cf",
          700: "#2461a6",
          800: "#215489",
          900: "#204771",
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        inter: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        15: "60px",
        17: "68px",
        18: "72px",
        19: "76px",
        22: "88px",
        25: "100px",
        26: "104px",
        30: "120px",
        50: "200px",
        70: "280px",
        84: "336px",
        88: "352px",
        90: "360px",
        100: "400px",
        104: "416px",
        108: "432px",
        112: "448px",
        116: "464px",
        120: "480px",
        125: "500px",
        130: "520px",
        140: "560px",
        150: "600px",
        180: "720px",
        190: "760px",
        200: "800px",
        250: "1000px",
      },
    },
  },
  plugins: [],
};