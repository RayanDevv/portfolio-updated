import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#C0B283',
          dark: '#8C7D54',
        }
      },
    },
  },
  plugins: [],
};
export default config;