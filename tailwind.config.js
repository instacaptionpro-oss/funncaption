/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/*/.{js,ts,jsx,tsx,mdx}',
    './components/*/.{js,ts,jsx,tsx,mdx}',
    './app/*/.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14B8A6', // Teal
        secondary: '#0EA5E9', // Blue
        accent: '#8B5CF6', // Purple
        gold: '#F59E0B', // Gold
      },
    },
  },
  plugins: [],
}
