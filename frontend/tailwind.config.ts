import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          lowest: "#487F64",
          lower: "#317D58",
          low: "#11643C",
          medium: "#084F2D",
          high: "#003B1E",
          highter: "#042515",
          hightest: "#03110A",
        },
        secondary: {
          lowest: "#FAF8EC",
          lower: "#F4EDCD",
          low: "#E0BF64",
          medium: "#CC952E",
          high: "#aa7124",
          highter: "#885220",
          hightest: "#724421",
        },
        tertiary: {
          lowest: "#FEBBB8",
          lower: "#FD7B77",
          low: "#CE231D",
          medium: "#A10702",
          high: "#830602",
          highter: "#600401",
          hightest: "#410301",
        },
      },
    },
  },
  plugins: [],
};
export default config;
