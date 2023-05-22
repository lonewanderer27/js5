/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c_primary: "#1b4c79",
        c_secondary: "#cdcdf4",
        c_background: "#ffffff",
        c_text: "#030c08",
        c_accent: "#080926",
        c_header: "#EAEAF4",
        c_input_label_box: "#B6B6CF",
        c_input_box: "#EAEAF4",
        c_solution_1: "#B6B6CF",
        c_solution_2: "#C7DDF0"
      },
      fontFamily: {
        'primary': 'JetBrains Mono',
        'secondary': 'Inter',
      }
    },
  },
  plugins: [],
}