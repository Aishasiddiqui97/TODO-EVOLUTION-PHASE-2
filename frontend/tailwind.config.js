/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neon color palette
        'neon-blue': '#00E5FF',
        'neon-purple': '#9B5CFF',
        'neon-pink': '#FF4FD8',
        'neon-orange': '#FF8C32',
        'neon-green': '#00FF88',
        'neon-red': '#FF4444',
        'neon-yellow': '#FFFF00',
        // Dark backgrounds
        dark: {
          950: '#0A0A0F',
          900: '#0F0F1A',
          850: '#141420',
          800: '#1A1A2E',
          700: '#2A2A3C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        // Multi-layer neon glow effects
        'neon-sm': '0 0 5px currentColor, 0 0 10px currentColor',
        'neon': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
        'neon-lg': '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor',
        'neon-xl': '0 0 15px currentColor, 0 0 30px currentColor, 0 0 60px currentColor, 0 0 90px currentColor',
        // 3D depth shadows
        '3d': '0 10px 30px rgba(0, 0, 0, 0.5), 0 1px 8px rgba(0, 0, 0, 0.3)',
        '3d-lg': '0 20px 60px rgba(0, 0, 0, 0.6), 0 5px 15px rgba(0, 0, 0, 0.4)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-subtle': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'float-3d': 'float3d 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        neonPulse: {
          '0%, 100%': {
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
            filter: 'brightness(1)',
          },
          '50%': {
            boxShadow: '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor',
            filter: 'brightness(1.3)',
          },
        },
        float3d: {
          '0%, 100%': {
            transform: 'translateY(0px) rotateX(0deg) rotateY(0deg)',
          },
          '33%': {
            transform: 'translateY(-20px) rotateX(5deg) rotateY(5deg)',
          },
          '66%': {
            transform: 'translateY(-10px) rotateX(-5deg) rotateY(-5deg)',
          },
        },
        glowPulse: {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.5)',
          },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
}