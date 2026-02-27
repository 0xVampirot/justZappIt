import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF9417",
        accent: "#FFB866",
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#000000",
        },
        surface: {
          DEFAULT: "#F9F9F9",
          dark: "#111111",
        },
        textPrimary: {
          DEFAULT: "#0A0A0A",
          dark: "#F5F5F5",
        },
        textSecondary: {
          DEFAULT: "#6B6B6B",
          dark: "#A0A0A0",
        },
        border: {
          DEFAULT: "#E5E5E5",
          dark: "#2A2A2A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        title: "var(--font-title)",
        subtitle: "var(--font-subtitle)",
        body: "var(--font-body)",
        button: "var(--font-button)",
        caption: "var(--font-caption)",
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        base: "var(--space-base)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
