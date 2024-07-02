/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#475BE8',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        slideIn: 'slideIn .5s ease-in-out ',
      },
      backgroundImage: {
        heroBackground: "url('../../assets/Mask group.png')",
      },
    },
    screens: {
      tablet: '900px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    keyframes: {
      slideIn: {
        '100%': { transform: 'translateX(0)' },
        ' 0%': { transform: 'translateX(100%)' },
      },
    },
  },
  plugins: [],
};
