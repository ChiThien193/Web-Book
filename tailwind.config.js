/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Thư mục `src`
    './pages/**/*.{js,ts,jsx,tsx}', // Thư mục `pages`
    './components/**/*.{js,ts,jsx,tsx}', // Thư mục `components`
    './app/**/*.{js,ts,jsx,tsx}', // Thư mục `app`
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

