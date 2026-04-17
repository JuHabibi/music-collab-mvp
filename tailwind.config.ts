import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px rgba(0,0,0,0.55)",
        card: "0 0 0 1px rgba(255,255,255,0.07), 0 22px 70px rgba(0,0,0,0.55)"
      },
      colors: {
        ink: {
          950: "#070A0F",
          900: "#0B1020",
          850: "#0E152B"
        }
      }
    }
  },
  plugins: []
};

export default config;

