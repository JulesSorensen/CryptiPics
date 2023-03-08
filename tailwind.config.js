module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/index.html'],
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['dark']
  },
  theme: {
    extend: {
      colors: {
        // primary colors
        'primary': '#93d3e2',
        'primary-dark': '#78bbcb',
        'primary-light': '#6dd8f1',
        // secondary colors
        secondary: '#2378ce',
        'secondary-dark': '#1e69b5',
        'secondary-light': '#1e69b5'
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '70%': { transform: 'rotate(5deg)' },
        },
      },
      animation: {
        'waving-hand': 'wave 0.3s ease-in-out',
      }
    }
  }
}
