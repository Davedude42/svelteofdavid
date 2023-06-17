/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        Mulish: ['Mulish', 'sans-serif'],
        IBMPlexMono: ['IBM Plex Mono', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
