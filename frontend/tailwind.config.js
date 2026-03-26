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
        // Light theme colors - Custom vibrant palette
        primary: { DEFAULT: '#8B5CF6', dark: '#7C3AED', light: '#EDE9FE' },
        secondary: { DEFAULT: '#F59E0B', dark: '#D97706', light: '#FEF3C7' },
        accent: { DEFAULT: '#14B8A6', dark: '#0D9488', light: '#CCFBF1' },
        success: { DEFAULT: '#10B981', dark: '#059669', light: '#D1FAE5' },
        warning: { DEFAULT: '#F59E0B', dark: '#D97706', light: '#FEF3C7' },
        danger: { DEFAULT: '#EF4444', dark: '#DC2626', light: '#FEE2E2' },
        
        // Legacy colors for compatibility
        saffron: { DEFAULT: '#FF9933', dark: '#E6821A' },
        navyIndia: { DEFAULT: '#0F1F3D', light: '#1A2F5A' },
        indiaGreen: { DEFAULT: '#138808', light: '#1AAD0A' },
        teal: { ...colors.teal, DEFAULT: colors.teal[500] },
        white: '#FFFFFF',
        red: { DEFAULT: '#E53935' },
        amber: { DEFAULT: '#FFC107' },
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
        'complaint-form-in': 'complaintFormIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'status-progress': 'statusProgress 1.2s ease-in-out',
        'upvote-bounce': 'upvoteBounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'category-flip': 'categoryFlip 0.5s ease-in-out',
        'field-focus': 'fieldFocus 0.4s ease-out',
        'success-check': 'successCheck 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'share-pop': 'sharePop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        rotateSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Project-specific keyframes
        complaintFormIn: {
          '0%': { transform: 'translateY(20px) scale(0.95)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        statusProgress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        upvoteBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        categoryFlip: {
          '0%': { transform: 'rotateY(-90deg)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'rotateY(0)', opacity: '1' },
        },
        fieldFocus: {
          '0%': { boxShadow: '0 0 0 0 rgba(139, 92, 246, 0.4)' },
          '100%': { boxShadow: '0 0 0 8px rgba(139, 92, 246, 0)' },
        },
        successCheck: {
          '0%': { transform: 'scale(0) rotate(-45deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(0)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        sharePop: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
