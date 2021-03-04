const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        red: colors.red,
        gray: {
          ...colors.gray,
          100: 'rgba(209, 220, 227, 0.18)',
          200: '#F5F7FA',
          300: '#DDE6E9',
          400: '#D1DCE3',
          500: '#CECECE',
          700: '#656565',
        },
        blue: {
          ...colors.blue,
          200: '#e0ebf8',
          400: '#5D9CEC',
          600: '#3D75BB',
        },
      },
      // Updates the config to achieve a Pixel-Perfect Layout
      // https://www.figma.com/file/ipV80xJ29T7rdz0Aoo7xWv/Antecipation?node-id=0%3A2
      height: {
        9: '37px',
      },
      padding: {
        1: '3px',
        8: '35px',
      },
      fontSize: {
        xs: '11px',
      },
      fontFamily: {
        sans: [
          '"Source Sans Pro"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
}
