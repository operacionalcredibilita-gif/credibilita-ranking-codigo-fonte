/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0a0a08',
          900: '#100f0b',
          800: '#17150f',
          700: '#201d15',
          600: '#2c2820',
          500: '#3a3426',
        },
        gold: {
          200: 'var(--gold-200, #f0dfa8)',
          300: 'var(--gold-300, #e8c878)',
          400: 'var(--gold-400, #d9b45c)',
          500: 'var(--gold-500, #c9a04a)',
          600: 'var(--gold-600, #a8823a)',
          700: 'var(--gold-700, #7d5f2a)',
        },
        ink: {
          100: '#f5f1e6',
          300: '#cfc8b5',
          500: '#a89f8c',
          700: '#6f6858',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)',
        goldGlow: '0 0 0 1px rgba(201,160,74,0.4), 0 8px 24px -8px rgba(201,160,74,0.25)',
      },
      keyframes: {
        fadeSlideUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        growWidth: {
          '0%': { width: 0 },
        },
      },
      animation: {
        fadeSlideUp: 'fadeSlideUp .45s cubic-bezier(.16,1,.3,1) both',
        fadeIn: 'fadeIn .3s ease both',
      },
    },
  },
  plugins: [],
}
