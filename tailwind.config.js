module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'rotate-y': {
          from: {
            transform: 'rotateY(0deg)',
          },
          to: {
            transform: 'rotateY(360deg)',
          },
        },
      },

      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'rotate-y': 'rotate-y 4s linear',
      },
    },
  },
  plugins: [],
}
