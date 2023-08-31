/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#253AD4",
        light: "#EEEFFC",
        dark: "#070B27",
        green: "#25D42C",
        secondary: {
          DEFAULT: "#E0E7F7",
          dark: "#0D1832",
        },
        accent: {
          DEFAULT: "#6A1EAD",
          dark: "#B67CE8",
        },
      },
      lineHeight: {
        l: "125.5%",
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, auto))",
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      tight: "-3%",
      normal: "0",
    },
  },
  plugins: [],
};
