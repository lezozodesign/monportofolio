/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        card: "#151515",
        primary: "#ff3e00",
        accent: "#8b5cf6",
        muted: "#4b5563",
        light: "#f3f4f6",
      },
      fontFamily: {
        heading: ["'Familjen Grotesk'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      perspective: { "1000": "1000px" },
      rotate: { "6": "6deg" },
    },
  },
  plugins: [],
};
