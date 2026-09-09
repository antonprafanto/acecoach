/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tennis: {
          yellow: '#CCFF00',
          yellowDark: '#A3CC00',
          navy: '#0A192F',
          navyLight: '#172A45',
          blue: '#1E40AF',
          blueLight: '#3B82F6',
          clay: '#EA580C',
          dark: '#0B0F19',
          surface: '#111827',
          surfaceLight: '#1F2937',
          slate: '#334155',
          white: '#FAFAFA',
          green: '#15803D'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      minHeight: {
        'touch': '52px',
      },
      minWidth: {
        'touch': '52px',
      }
    },
  },
  plugins: [],
}
