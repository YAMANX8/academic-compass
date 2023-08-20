/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#253AD4",
        light: "#EEEFFC",
        dark: "#070B27",
        secondary: {
          DEFAULT: "#E0E7F7",
          dark: "#0D1832",
        },
        accent: {
          DEFAULT: "#6A1EAD",
          dark: "#B67CE8",
        },
      },
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
