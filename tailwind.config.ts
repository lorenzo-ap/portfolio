/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bg-color": "var(--bg-color)",
        text: "var(--text)",
        "faded-text": "var(--faded-text)",
        "faded-line": "var(--faded-line)",
        "faded-bg": "var(--faded-bg)",
        "subfaded-text": "var(--subfaded-text)",
      },
      listStyleType: {
        square: "square",
      },
    },
  },
  plugins: [],
};
