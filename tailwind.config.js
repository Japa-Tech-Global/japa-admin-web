/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [],
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './public/index.html'],

  theme: {
    extend: {
      textColor: {
        primary: '#7D30EE',
        primaryDark: '#32135f',
        primaryLight: '#d8c1fa',
        success: '#25AD25',
        secondary: '#FFBD17',
        error: '#FF0606',
      },
      backgroundColor: {
        primary: '#7D30EE',
        primaryDark: '#32135f',
        primaryLight: '#d8c1fa',
        secondary: '#FFBD17',
        error: '#FF0606',
        grey: '#DEDCDC',
      },
      borderColor: {
        primary: '#D0D5DD',
      },
      fontFamily: {
        primary: 'Poppins, sans-serif',
      },
      padding: {
        primary: '5vw',
      },
      minHeight: {
        main: 'calc(100vh - 80px)',
      },
      height: {
        main: 'calc(100vh - 80px)',
      },
    },
  },
};
