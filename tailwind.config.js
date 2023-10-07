/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      transparent: "transparent",
      primary: colors.indigo,
      ...colors,
    },
  },
};
