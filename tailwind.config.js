/** @type {import('tailwindcss').Config} */
// import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-red": "#ED193A",
        "secondary-500": "#3B28CC",
        "secondary-600": "#2D1E99",
        "dark-1": "#151303",
        "dark-2": "#23252C",
        "dark-3": "#464A58",
        "dark-4": "#7E8287",
        "light-1": "#FFFFFF",
        "light-2": "#EEEEEE",
        "light-3": "#DDDDDD",
        "light-4": "#CCCCCC",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      lineHeight: {
        5.5: "22px",
        11: "44px",
        12: "48px",
        12.5: "50px",
        13: "52px",
        14: "56px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
