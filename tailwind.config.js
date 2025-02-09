const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),

  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      
    },
    extend: {
      colors: {
        "main": "#0aad0a#0aad0a",
        "light": "#f0f3f2"
      }
    },
  },
  plugins: [
    flowbite.plugin(),

  ],
  darkMode:'class'
}