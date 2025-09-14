/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#0F172A',  // Dark navy background
          light: '#1E293B',  // Slightly lighter navy for cards/sections
        },
        primary: {
          DEFAULT: '#8B5CF6', // Purple
          light: '#A78BFA',
          dark: '#7C3AED',
        },
        secondary: {
          DEFAULT: '#3B82F6', // Blue
          light: '#60A5FA', 
          dark: '#2563EB',
        },
        accent: {
          DEFAULT: '#06B6D4', // Teal
          light: '#22D3EE',
          dark: '#0891B2',
        },
        success: '#10B981', // Green
        warning: '#F59E0B', // Amber
        error: '#EF4444',   // Red
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          muted: '#64748B',
        }
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