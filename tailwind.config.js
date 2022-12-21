/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Baloo Thambi 2', 'cursive'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        carmine: '#950F12',
        goldMetallic: '#D8B144',
        lemonCurry: {
          light: '#EEE2C2',
          DEFAULT: '#CC9901',
        },
        charcoal: '#373F51',
        darkPurple: '#271F30',
        cultured: {
          DEFAULT: '#F6F4F3',
          100: '#F6F4F4',
          300: '#EEEAE8',
          700: '#E0DAD6',
        },
      },
    },
  },
  plugins: [],
};
