/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '9xl': '96rem',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        heading: ['var(--font-heading)', 'sans-serif'],
      },
      keyframes: {
        ripple: {
          '0%': { width: '0', height: '0', opacity: '0.5' },
          '100%': { width: '400px', height: '400px', opacity: '0' },
        },
      },
      animation: {
        ripple: 'ripple 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;