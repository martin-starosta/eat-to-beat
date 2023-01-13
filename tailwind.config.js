/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "4rem",
    },
    extend: {
      fontFamily: {
        arvo: ["Arvo", "sans-serif"],
        body: ["Arvo", "sans-serif"],
      },
      gridTemplateColumns: {
        "main-layout": "4fr 3fr",
      },
    },
  },
  plugins: [],
};
