/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/preset");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
  extend: {
    fontFamily: {
      whitneyRegular: ["Whitney-Regular"],
      whitneyBold: ["Whitney-Bold"],
      },
    },
  },
  plugins: [],
};