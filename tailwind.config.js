module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pink: {
          500: '#FC00FF',
        },
        blue: {
          400: '#00DBDE',
          500: '#56CCF2',
          600: '#2F80ED',
        },
      },
      width: {
        374: '374px',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      backgroundImage: ['hover', 'focus', 'active'],
      scale: ['active'],
    },
  },
  plugins: [],
};
