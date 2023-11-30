/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "black",
        secondary: "rgb(33, 34, 38)",
        input: "rgb(47, 49, 54)",
        font: "rgb(217, 218, 221)",
        alertFont: "rgb(193, 113, 112)",
        alertContainer: "rgb(244, 237, 236)",
        placeholder:"rgba(217, 218, 221, 0.3)",
        secondaryButton: "#305EF6",
        whiteButtonHover: "rgb(217, 218, 221)",
        secondaryButtonHover: "#1F4BC8",
      },
      boxShadow: {
        card: "0px 10px 100px 25px #28283d",
        button: "0 8px 5px 0 black"
      }
    },
  },
  plugins: [],
}