/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.display-none': {
          display: 'none',
        },
      };
      
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}