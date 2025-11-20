/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'israel-relevant': '#dc2626', // Red for Israel-relevant news
        'other-coverage': '#9ca3af', // Gray for other coverage
      },
    },
  },
  plugins: [],
}

