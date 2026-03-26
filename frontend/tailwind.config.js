/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: { DEFAULT: '#FF9933', dark: '#E6821A' },
        navyIndia: { DEFAULT: '#0F1F3D', light: '#1A2F5A' },
        indiaGreen: { DEFAULT: '#138808', light: '#1AAD0A' },
        teal: { ...colors.teal, DEFAULT: colors.teal[500] },
        white: '#FFFFFF',
        red: { DEFAULT: '#E53935' },
        amber: { DEFAULT: '#FFC107' },
        // Vyavastha Modern Colors
        vyvy: {
          primary: '#06B6D4',      // Cyan
          secondary: '#0891B2',    // Dark Cyan
          accent: '#06B6D4',       // Bright Cyan
          dark: '#0F172A',         // Deep Navy
          light: '#E0F2FE',        // Light Cyan
          success: '#10B981',      // Emerald
          warning: '#F59E0B',      // Amber
          danger: '#EF4444',       // Red
        },
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'rotate-spin': 'rotateSpin 20s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotateSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
