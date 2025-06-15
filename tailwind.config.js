// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // --- DIUBAH: Sekarang kita memindai file .html dan file .js di folder data ---
  content: [
    "./*.html",
    "./projects/**/*.html", // Untuk memindai semua halaman detail proyek
    "./assets/js/**/*.js",
    "./data/**/*.js"       // Penting, agar kelas di file data juga terbaca
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'background': '#070912',
        'surface': 'rgba(15, 18, 32, 0.4)',
        'primary': '#67E8F9',
        'secondary': '#C084FC',
        'tertiary': '#86EFAC',
        'muted': '#94A3B8',
      }
    },
  },
  plugins: [],
}