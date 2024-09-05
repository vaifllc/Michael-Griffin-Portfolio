/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        cookie: ['Cookie', 'cursive'],
        courgette: ['Courgette', 'cursive'],
      },
      colors: {
        'vt-c-white': '#ffffff',
        'vt-c-white-soft': '#f8f8f8',
        'vt-c-white-mute': '#f2f2f2',
        'vt-c-black': '#181818',
        'vt-c-black-soft': '#222222',
        'vt-c-black-mute': '#282828',
        'vt-c-indigo': '#2c3e50',
        'vt-c-divider-light-1': 'rgba(60, 60, 60, 0.29)',
        'vt-c-divider-light-2': 'rgba(60, 60, 60, 0.12)',
        'vt-c-divider-dark-1': 'rgba(84, 84, 84, 0.65)',
        'vt-c-divider-dark-2': 'rgba(84, 84, 84, 0.48)',
        'vt-c-text-light-1': '#2c3e50',
        'vt-c-text-light-2': 'rgba(60, 60, 60, 0.66)',
        'vt-c-text-dark-1': '#ffffff',
        'vt-c-text-dark-2': 'rgba(235, 235, 235, 0.64)',
      },
    },
  },
  plugins: [],
}