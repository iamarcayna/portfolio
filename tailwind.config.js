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
      },
      keyframes: {
        beat: {
          "75%, 100%": {
            transform: "scale(1.2)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};