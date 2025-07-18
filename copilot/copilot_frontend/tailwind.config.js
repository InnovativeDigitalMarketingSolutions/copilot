/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
    "./**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {colors: {
      background: 'rgba(255,255,255,0.05)',
    },
    boxShadow: {
      'glass': '0 8px 32px rgba(0,0,0,0.2)',
    }},
  },
  plugins: [
    requeire('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}