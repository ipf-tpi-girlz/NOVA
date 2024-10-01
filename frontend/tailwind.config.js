import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html", "./pages/**", "./src/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}

