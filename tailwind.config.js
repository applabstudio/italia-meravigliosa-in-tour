const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.red,
        accent: colors.yellow,


      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          light: "#1F2937",
          main: "#0D1111",
          dark: "#0A093D",
          accent: "#353535",
          // DEFAULT:"#3668FF",
        },
        green:{
          main:"#C7FDE5",
          dark:"#009D69",
        },
        grey:{
          main:"#656464",
          light:"#767E7E",
          exlight:"#6B7280",
        },
        red:{
          main:"#EF4444",
        },
        blue:{
          main:"#217BF4",
        },
        pink:{
          main: "#F36A6A",
          light:"#FEE2E2"
        },
      
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography") ],
}
