/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      fontWeight: {
        '600': '600',
        '700': '700',
        '800': '800',
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
      },
      height: {
        '13': '3.25rem',
        '14': '3.5rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'pop': 'pop 0.3s ease-out forwards',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
