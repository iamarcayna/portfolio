/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "hero-light":
          "linear-gradient(to bottom, rgba(255, 255, 255,0.7), rgba(255, 255, 255)), url('./assets/images/hero-bg.svg')",
        "hero-dark":
          "linear-gradient(to bottom, rgba(31, 41, 55,0.8), rgba(31, 41, 55)), url('./assets/images/hero-bg.svg')",
      },
      fontFamily: {
        "dancing-script": ["Dancing Script", "cursive"],
        "source-sans": ['"Source Sans Pro"', "sans-serif"],
      },
      animation: {
        heartbeat: "beat 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        showIn: "showIn 200ms cubic-bezier(0, 0, 0.2, 1) forwards",
        blob: "blob 7s infinite",
      },
      keyframes: {
        beat: {
          "75%, 100%": {
            transform: "scale(1.2)",
            opacity: "0",
          },
        },
        showIn: {
          "0%": {
            transform: "scale(0)",
            opacity: "0",
          },
          "20%": {
            transform: "scale(0.2)",
            opacity: "0.2",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(10%, -10%) scale(1.1)",
          },
          "66%": {
            transform: "translate(-15%, 15%) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
