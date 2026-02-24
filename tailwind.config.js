/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          dark:  'rgb(var(--bg-dark)  / <alpha-value>)',
          light: 'rgb(var(--bg-light) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary)       / <alpha-value>)',
          light:   'rgb(var(--primary-light) / <alpha-value>)',
          dark:    'rgb(var(--primary-dark)  / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary)       / <alpha-value>)',
          light:   'rgb(var(--secondary-light) / <alpha-value>)',
          dark:    'rgb(var(--secondary-dark)  / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent)       / <alpha-value>)',
          light:   'rgb(var(--accent-light) / <alpha-value>)',
          dark:    'rgb(var(--accent-dark)  / <alpha-value>)',
        },
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        error:   'rgb(var(--error)   / <alpha-value>)',
        text: {
          primary:   'rgb(var(--text-primary)   / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          muted:     'rgb(var(--text-muted)     / <alpha-value>)',
        },
        // Override Tailwind's built-in gray-700/800 to make border-gray-700/800 themeable
        gray: {
          700: 'rgb(var(--gray-700) / <alpha-value>)',
          800: 'rgb(var(--gray-800) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        gradientShift: 'gradientShift 15s ease infinite',
      },
      backgroundSize: {
        'gradient-size': '300% 300%',
      }
    },
  },
  plugins: [],
};
