/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0d9488", 
        "luxe-island": "#164b67",
        "secondary": "#A91D3A",
      },
    },
  },
  plugins: [],
};