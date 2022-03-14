const colors = require('tailwindcss/colors');

const white = colors.white;
const black = colors.black;
const basicColor = colors.slate;
const primaryColor = colors.blue;
const linkColor = colors.blue;

module.exports = {
  content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      ui: ['a-otf-ud-shin-go-pr6n', 'sans-serif'],
      logo: ['Yusei Magic', 'fantasy'],
    },
    extend: {
      colors: {
        background: {
          light: white,
          dark: basicColor[900],
        },
        foreground: {
          light: basicColor[900],
          dark: basicColor[100],
          heading: {
            primary: {
              light: black,
              dark: white,
            },
            secondary: {
              light: basicColor[800],
              dark: basicColor[300],
            },
          },
        },
        basicColor,
        primaryColor,
        border: {
          light: basicColor[600],
          dark: basicColor[100],
        },
        link: {
          light: linkColor[500],
          dark: linkColor[300],
          hover: {
            light: linkColor[700],
            dark: linkColor[100],
          },
        },
        button: {
          primary: {
            background: primaryColor[500],
            text: white,
            hover: {
              background: primaryColor[700],
              text: white,
            },
          },
        },
        input: {
          background: {
            light: white,
            dark: black,
          },
          foreground: {
            light: black,
            dark: white,
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
};
