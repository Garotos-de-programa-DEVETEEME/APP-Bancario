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
     elevation: {
      1: 1,
      2: 2,
      4: 4,
      8: 8,
    },
    fontFamily: {
      whitneyRegular: ["Whitney-Regular"],
      whitneyBold: ["Whitney-Bold"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
    addUtilities({
      '.elevation-1': { elevation: 1 },
      '.elevation-2': { elevation: 2 },
      '.elevation-4': { elevation: 4 },
      '.elevation-8': { elevation: 8 },
    });
  },
  ],
};