/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E1065',
          dark: '#1C0942',
          light: '#42188C',
          50: '#F4EFFE',
          100: '#E6D7FD',
          200: '#CEAFFB',
          800: '#2E1065',
          900: '#1C0942',
        },
        secondary: {
          DEFAULT: '#7C3AED',
          light: '#9F67F4',
          dark: '#5B21B6',
          50: '#F5F3FF',
          100: '#EDE9FE',
        },
        tertiary: {
          DEFAULT: '#F59C0D',
          light: '#FBBF24',
          dark: '#D97706',
        },
        neutralCustom: {
          DEFAULT: '#7A7A7C',
          light: '#F3F4F6',
          dark: '#374151',
        }
      },
      fontFamily: {
        headline: ['Libre Caslon Text', 'serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
