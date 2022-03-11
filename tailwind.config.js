const DEFAULT_THEME = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      tl: '600px',
      ...DEFAULT_THEME.screens,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
