/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        blue: {
          main: '#2671D9',
          surface: '#E9F1FB',
          hover: '#1D56A5',
          border: '#BAD1F3'
        },
        red: {
          main: '#FF5656',
          hover: '#C24C4C',
          border: '#FFD0D0',
          surface: '#FFEEEE',
        },
        green: {
            main: '#0EA976',
            border: '#BCE7D8',
            surface: '#E7F6F1',
            hover: '#138A63',
        },
        yellow: {
          main: '#F08800',
          hover: '#cc7401',
          surface: '#FEF3E5',
          border: '#FBDEB7',
        },
        netral: {
          white: '#FFFFFF',
          black: '#333333',
          stroke: '#E5E7E9',
          textField: '#9C9C9C',
          disbled: '#E0E0E0',
          textDisabled: '#7F7F80',
          background: '#F6F7FD',
          divider: '#F0F3F7',
          label: '#4D5E80',
          label2: '#7B8DAD'
        }
      },
      translate: {
        'center+20': 'calc(-50% - 6px)'
      },
      fontFamily: {
        inter: ['Inter']
      }
    },
  },
  plugins: [],
}

