/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#008000',
        secondary: '#F55E1E',
      },
      //   backgroundImage: {
      //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //     'gradient-conic':
      //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      //   },
      fontFamily: {
        sans: ['var(--font-inter)'],
        sans2: ['var(--font-commissioner)'],
      },
    },
  },
  // add daisyUI plugin
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    require('tailwindcss-debug-screens'),
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: '#008000',
          'primary-focus': '#015701',
          'primary-content': 'white',
          secondary: '#F55E1E',
          'secondary-focus': '#de4707',
          'secondary-content': 'white',
        },
      },
      'dark',
      'cupcake',
    ],
    // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'light', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
