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
        advance: "#D42525",
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
        9: "repeat(9, minmax(0, 167.5px))",
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-back": "cubic-bezier(0.780, -0.375, 0.260, 1.320)",
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
