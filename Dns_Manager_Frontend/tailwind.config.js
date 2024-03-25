/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        loginbg: '#F0F4FC', // Corrected: Color value wrapped in quotation marks
        dashBoardButtonbg:'#5D5FEF', // Corrected: Color value wrapped in quotation marks
      },
    },
  },
  plugins: [],
}
