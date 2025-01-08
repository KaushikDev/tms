/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true, // Centers the container horizontally
        padding: '2rem', // Adds padding inside the container
        screens: {
          'sm': '100%',
          'md': '800px',
          'lg': '1000px',
          'xl': '1200px',
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
};
