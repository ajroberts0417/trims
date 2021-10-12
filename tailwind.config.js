// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Times New Roman', 'Georgia', 'Cambria', 'Times', 'serif'],
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
        '-30': '-30',
        '-40': '-40',
        '-50': '-50',
      },
      colors: {
        'pink': {
          'darkest': '#55002A',
          'darker': '#B00058',
          'dark': '#DE006F',
          'default': '#FF0D86',
          'light': '#FF3B9D',
          'lightest': '#FF69B4',
        },
        'yellow': {
          'default': '#FBBE4B',
        },
        'cream': {
          'default': '#F4E9DA',
        },
        'red': {
          'lighter': '#f17d71',
          'default': '#ED5C4D',
          'darker': '#a64036',
        },
        'blue': {
          'default': '#273253',
          'lighter': '#57B5ED',
        },
        'white': {
          'darker': '#E8E8E8',
          'default': '#FFFFFF',
        }
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
};