/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glucose: {
          safe: '#22c55e',
          moderate: '#f59e0b',
          high: '#ef4444',
        },
        brand: {
          purple: '#7c3aed',
          blue: '#3b82f6',
          teal: '#14b8a6',
          orange: '#f97316',
          pink: '#ec4899',
        }
      },
      fontFamily: {
        rounded: ['system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
