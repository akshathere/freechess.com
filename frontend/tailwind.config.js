/** @type {import('tailwindcss').Config} */
/*eslint-disable*/
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blacki: '#302E2B',
        lblacki: '#3C3B39',
        green: '#81B64C',
        'green-l': '#ECECD0',
        'd-green': '#779557',
        peach: '#ECECD0',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      animation: {
        'slide-down': 'slideDown 2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-up': 'slideUp 2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        GojoEnter: 'GojoEnter 2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        SukunaEnter: 'SukunaEnter 2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        ChessboardEnter: 'ChessboardEnter 2s cubic-bezier(0.25, 1, 0.5, 1) forwards'
      },
      keyframes: {
        slideDown: {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        slideUp: {
          '0%': {
            transform: 'translateY(100%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        GojoEnter: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0.5'
          },
          '80%': {
            transform: 'translateX(-20vw)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(-20vw)',
            opacity: '1'
          }
        },
        SukunaEnter: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0.5'
          },
          '80%': {
            transform: 'translateX(20vw)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateX(20vw)',
            opacity: '1'
          }
        },
        ChessboardEnter: {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0'
          },
          '80%': {
            transform: 'translateY(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [
    require("tailwindcss-animate")
  ]
};
