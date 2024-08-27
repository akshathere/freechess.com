/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "blacki":"#302E2B",
        "lblacki" : "#3C3B39",
        "green":"#81B64C",
        "green-l":"#ECECD0",
        "d-green":"#779557",
        "peach":"#ECECD0"
      }
    },
  },
  plugins: [],
}

