
const plugin = require("tailwindcss/plugin");
const rtl = require("tailwindcss-rtl");

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust paths if necessary
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [rtl],

  theme: {
    extend: {},
  },
  plugins: [],
};
