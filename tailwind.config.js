/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      // Ubuntu Analytica - Neon Edition Brand Colors
      colors: {
        // Primary Colors (same in both themes)
        'electric-blue': '#3F45FF',
        'cyber-purple': '#5721C6',
        'neon-coral': '#FF5F4D',

        // Dynamic colors that change with theme
        'theme': {
          'bg': 'var(--color-midnight-black)',
          'text': 'var(--color-white)',
          'secondary': 'var(--color-soft-neon-glow)',
          'surface': 'var(--color-surface, var(--color-midnight-black))',
        },

        // Support Colors (for dark mode)
        'midnight-black': '#050505',
        'ubuntu-blue': '#0D1E2C',
        'soft-neon-glow': '#C5C9FF',

        // Gradient stops for utilities
        'neon': {
          blue: '#3F45FF',
          purple: '#5721C6',
          coral: '#FF5F4D',
          glow: '#C5C9FF',
        }
      },

      // Brand Typography
      fontFamily: {
        heading: ['League Spartan', 'sans-serif'],
        body: ['Muli', 'sans-serif'],
        sans: ['Muli', 'sans-serif'], // Default
      },

      // Spacing Scale (8px base)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },

      // Background Gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3F45FF 0%, #5721C6 100%)',
        'gradient-secondary': 'linear-gradient(90deg, #3F45FF 0%, #FF5F4D 100%)',
        'gradient-tertiary': 'linear-gradient(180deg, #5721C6 0%, #FF5F4D 100%)',
        'gradient-radial-neon': 'radial-gradient(circle, #3F45FF 0%, #5721C6 50%, #050505 100%)',
      },

      // Neon Glow Shadows
      boxShadow: {
        'glow-soft': '0 0 20px rgba(63, 69, 255, 0.3)',
        'glow-medium': '0 0 30px rgba(63, 69, 255, 0.5), 0 0 60px rgba(87, 33, 198, 0.3)',
        'glow-strong': '0 0 40px rgba(63, 69, 255, 0.8), 0 0 80px rgba(87, 33, 198, 0.5), 0 0 120px rgba(255, 95, 77, 0.3)',
        'glow-electric': '0 0 20px rgba(63, 69, 255, 0.4)',
        'glow-purple': '0 0 20px rgba(87, 33, 198, 0.4)',
        'glow-coral': '0 0 20px rgba(255, 95, 77, 0.4)',
      },

      // Text Shadows for Neon Glow
      textShadow: {
        'glow': '0 0 20px rgba(63, 69, 255, 0.8), 0 0 40px rgba(63, 69, 255, 0.5)',
        'glow-strong': '0 0 30px rgba(63, 69, 255, 1), 0 0 60px rgba(63, 69, 255, 0.7)',
      },

      // Border Radius
      borderRadius: {
        'neon': '1rem',
      },

      // Backdrop Blur for Glassmorphism
      backdropBlur: {
        'neon': '16px',
      },

      // Animations
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(63, 69, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(63, 69, 255, 0.8)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [
    // Custom plugin for text-shadow utility
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
}
