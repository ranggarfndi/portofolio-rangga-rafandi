// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.php",
    "./admin/**/*.php",
    "./partials/**/*.php",
    "./templates/**/*.php",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      // PALET WARNA BARU "COSMIC GLASS / SUBTLE AURORA"
      colors: {
        'background': '#070912',      // Biru dongker sangat gelap
        'surface': 'rgba(15, 18, 32, 0.4)', // Warna kaca yang lebih gelap dan kebiruan, dengan transparansi
        'primary': '#67E8F9',         // Cyan yang lebih lembut (soft cyan)
        'secondary': '#C084FC',       // Ungu lavender (soft purple)
        'tertiary': '#86EFAC',       // Hijau mint (soft green)
        'muted': '#94A3B8',           // Abu-abu kebiruan yang lebih terang
      }
    },
  },
  plugins: [],
}