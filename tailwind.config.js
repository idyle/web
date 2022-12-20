/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'text-lime-200',
    'text-3xl',
    'lg:text-4xl',
  ],
  theme: {
    extend: {
      keyframes: {
        growBar1: {
          '0%': { 'animation-timing-function': 'linear', transform: 'scaleX(0.1)' },
          '36.6%': { 'animation-timing-function': 'cubic-bezier(0.33473, 0.12482, 0.78584, 1)', transform: 'scaleX(0.1)' },
          '69.15%': { 'animation-timing-function': 'cubic-bezier(0.22573, 0, 0.23365, 1.37098)', transform: 'scaleX(0.83)' },
          '100%' : { transform: 'scaleX(0.1)' }
        },
        moveBar1: {
          '0%': { left: '-105.16667%', animationTimingFunction: 'linear' },
          '20%': { left: '-105.16667%', animationTimingFunction: 'cubic-bezier(0.5, 0, 0.70173, 0.49582)' },
          '69.15%': { left: '21.5%', animationTimingFunction: 'cubic-bezier(0.30244, 0.38135, 0.55, 0.95635)' },
          '100%': { left: '95.44444%' }
        },
        growBar2: {
          '0%': { animationTimingFunction: 'cubic-bezier(0.20503, 0.05705, 0.57661, 0.45397)', transform: 'scaleX(0.1)' },
          '19.15%': { animationTimingFunction: 'cubic-bezier(0.15231, 0.19643, 0.64837, 1.00432)', transform: 'scaleX(0.57)' },
          '44.15%': { animationTimingFunction: 'cubic-bezier(0.25776, -0.00316, 0.21176, 1.38179)', transform: 'scaleX(0.91)' },
          '100%' : { transform: 'scaleX(0.1)' }
        },
        moveBar2: {
          '0%': { left: '-54.88889%', animationTimingFunction: 'cubic-bezier(0.15, 0, 0.51506, 0.40968)' },
          '25%': { left: '-17.25%', animationTimingFunction: 'cubic-bezier(0.31033, 0.28406, 0.8, 0.73372)' },
          '48.35%': { left: '29.5%', animationTimingFunction: 'cubic-bezier(0.4, 0.62703, 0.6, 0.90203)' },
          '100%': { left: '117.38889%' }
        },
        start: {
          from: { maxHeight: '0', opacity: '0' }, to: { maxHeight: '20px', opacity: '1' }
        },
        slideDown: {
          '0%, 100%': { transform: 'translateY(0px)' }, '10%, 90%': { transform: 'translateY(0px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' }, '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' }, '100%': { opacity: '0' }
        },
      },
      animation: {
        'bar1': 'growBar1 2.5s infinite, moveBar1 2.5s infinite',
        'bar2': 'growBar2 2.5s infinite, moveBar2 2.5s infinite',
        'bar': 'start 0.3s ease-in',
        'slide': 'slideDown 2.5s 1.0s 1 ease forwards',
        'fadein': 'fadeIn 0.5s ease-in',
        'fadeout': 'fadeOut 0.5s ease-in',
      }
    },
    fontFamily: {
      sans: ['Okta', 'sans-serif']
    },
  },
  plugins: [],
}