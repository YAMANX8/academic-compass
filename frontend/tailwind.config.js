/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: withOpacity("--color-primary-lighter"),
          light: withOpacity("--color-primary-light"),
          DEFAULT: withOpacity("--color-primary-main"),
          dark: withOpacity("--color-primary-dark"),
          darker: withOpacity("--color-primary-darker"),
        },
        secondary: {
          lighter: withOpacity("--color-secondary-lighter"),
          light: withOpacity("--color-secondary-light"),
          DEFAULT: withOpacity("--color-secondary-main"),
          dark: withOpacity("--color-secondary-dark"),
          darker: withOpacity("--color-secondary-darker"),
        },
        accent: {
          lighter: withOpacity("--color-accent-lighter"),
          light: withOpacity("--color-accent-light"),
          DEFAULT: withOpacity("--color-accent-main"),
          dark: withOpacity("--color-accent-dark"),
          darker: withOpacity("--color-accent-darker"),
        },
        success: {
          lighter: withOpacity("--color-success-lighter"),
          light: withOpacity("--color-success-light"),
          DEFAULT: withOpacity("--color-success-main"),
          dark: withOpacity("--color-success-dark"),
          darker: withOpacity("--color-success-darker"),
        },
        info: {
          lighter: withOpacity("--color-info-lighter"),
          light: withOpacity("--color-info-light"),
          DEFAULT: withOpacity("--color-info-main"),
          dark: withOpacity("--color-info-dark"),
          darker: withOpacity("--color-info-darker"),
        },
        warning: {
          lighter: withOpacity("--color-warning-lighter"),
          light: withOpacity("--color-warning-light"),
          DEFAULT: withOpacity("--color-warning-main"),
          dark: withOpacity("--color-warning-dark"),
          darker: withOpacity("--color-warning-darker"),
        },
        error: {
          lighter: withOpacity("--color-error-lighter"),
          light: withOpacity("--color-error-light"),
          DEFAULT: withOpacity("--color-error-main"),
          dark: withOpacity("--color-error-dark"),
          darker: withOpacity("--color-error-darker"),
        },
        dark: withOpacity("--color-dark"),
        light: withOpacity("--color-light"),
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
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 10s linear infinite',
      },
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
