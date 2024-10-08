<<<<<<< HEAD
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html", "./pages/**", "./src/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
}

=======
import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake", "valentine"],
  },
};
>>>>>>> 02e633c8736f4ce3db609555dc79f455f338683b
