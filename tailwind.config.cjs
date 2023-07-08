/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        Mulish: ['Mulish', 'sans-serif'],
        IBMPlexMono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        primary: '#1E90FF',
        lighter: '#6AB5FF',
        secondary: '#FF8D1D'
      }
    },
  },
  plugins: [],
}
