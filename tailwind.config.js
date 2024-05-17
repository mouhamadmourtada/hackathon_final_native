/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      'primary':'#00719c',
      'secondary':'#009BD6',
      'accent':'#00415a'
  },
},
  plugins: [],
}

