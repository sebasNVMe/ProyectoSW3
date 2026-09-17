/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4f46e5',
        'custom-indigo': '#4338ca',
        'custom-light': '#f5f3ff',
        'custom-dark': '#1e1b4b',
        'custom-slate': '#f9fafb',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

