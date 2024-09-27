/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavanda: '#E6E6FA',
        malva: '#D8BFD8',
        blanco: '#FFFDD0',
        naranja: '#FFDAB9',
        gris: '#D3D3D3',
      },
    },
  },
  plugins: [],
}