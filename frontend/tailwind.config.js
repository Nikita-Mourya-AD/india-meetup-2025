/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'appdirect-blue': '#1e3a8a', // Navy blue
        'appdirect-light-blue': '#eff6ff', // Light navy blue
        'navy-blue': '#1e3a8a',
        'navy-light': '#eff6ff',
        'navy-dark': '#1e40af',
      }
    },
  },
  plugins: [],
}
