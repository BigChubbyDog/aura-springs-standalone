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
        // Aura Springs Brand Colors from logo
        aura: {
          primary: {
            50: '#f0f4ec',
            100: '#e1e9d9',
            200: '#c3d3b3',
            300: '#a5bd8d',
            400: '#87a767',
            500: '#7c9768', // Main brand green
            600: '#637853',
            700: '#4c673d', // Dark green
            800: '#3d522f',
            900: '#2e3d22',
          },
          secondary: {
            50: '#f3f4f5',
            100: '#e7e8eb',
            200: '#cfd1d7',
            300: '#b7bac3',
            400: '#9fa3af',
            500: '#8d9199', // Neutral gray
            600: '#71747a',
            700: '#55575b',
            800: '#393a3c',
            900: '#1d1d1e',
          },
          accent: {
            purple: '#443474', // Accent purple
            light: '#6b5b95',
            dark: '#2d2350',
          },
          neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#8d9199', // Main neutral
            700: '#616161',
            800: '#424242',
            900: '#212121',
            light: '#ddddde', // Light gray
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-down': 'fadeDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'zoom-in': 'zoomIn 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'aura-gradient': 'linear-gradient(135deg, #7c9768 0%, #4c673d 100%)',
        'aura-gradient-reverse': 'linear-gradient(135deg, #4c673d 0%, #7c9768 100%)',
        'purple-gradient': 'linear-gradient(135deg, #443474 0%, #6b5b95 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'large': '0 10px 40px rgba(0, 0, 0, 0.15)',
        'xl': '0 20px 60px rgba(0, 0, 0, 0.20)',
        '2xl': '0 25px 80px rgba(0, 0, 0, 0.25)',
        '3xl': '0 30px 100px rgba(0, 0, 0, 0.30)',
        'aura': '0 10px 30px rgba(124, 151, 104, 0.3)',
        'aura-lg': '0 20px 60px rgba(124, 151, 104, 0.4)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}