/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        navy: {
          50: '#eff3fb',
          100: '#d8e1f4',
          200: '#b0c2e8',
          300: '#7d9ad7',
          400: '#4f72c2',
          500: '#2d51a8',
          600: '#1B3D8F',
          700: '#163074',
          800: '#11245a',
          900: '#0a1636',
          950: '#060d1f',
        },
        crimson: {
          50: '#fff0f0',
          100: '#ffdede',
          200: '#ffbcbc',
          300: '#ff8a8a',
          400: '#ff4f4f',
          500: '#f71b1b',
          600: '#C41E3A',
          700: '#a31528',
          800: '#861320',
          900: '#6e141e',
          950: '#3d050b',
        },
        skyblue: {
          50: '#f0f9ff',
          100: '#dff2fd',
          200: '#b7e5fb',
          300: '#76d0f7',
          400: '#3AAEE0',
          500: '#0d92cc',
          600: '#0175aa',
          700: '#025c89',
          800: '#064e71',
          900: '#0a415f',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
