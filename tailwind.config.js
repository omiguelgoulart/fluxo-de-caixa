/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [
  function ({ addUtilities }) {
    const newUtilities = {
      '.display-none': {
        display: 'none',
      },
    };

    addUtilities(newUtilities, ['responsive', 'hover']);
  },
];