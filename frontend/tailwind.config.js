/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chessboard': "url('/src/assets/Chessboard.png')",
      },
      colors:{
        "blacki":"#302E2B",
        "lblacki" : "#3C3B39",
        "green":"#81B64C",
        "green-l":"#ECECD0",
        "d-green":"#779557",
        "peach":"#ECECD0"
      },
      animation: {
        'slide-down': 'slideDown 2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-up': 'slideUp 2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'GojoEnter': 'GojoEnter 2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'SukunaEnter': 'SukunaEnter 2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'ChessboardEnter': 'ChessboardEnter 2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        GojoEnter: {
          '0%': { transform: 'translateX(100%)', opacity: '0.5' },  // Start from right
          '80%': { transform: 'translateX(-20vw)', opacity: '1' },  // Move toward left, stop near left
          '100%': { transform: 'translateX(-20vw)', opacity: '1' }, // Final position near left
        },
        SukunaEnter: {
          '0%': { transform: 'translateX(-100%)', opacity: '0.5' },  // Start from right
          '80%': { transform: 'translateX(20vw)', opacity: '1' },  // Move toward left, stop near left
          '100%': { transform: 'translateX(20vw)', opacity: '1' }, // Final position near left
        },
        ChessboardEnter: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },   // Start off-screen top
          '80%': { transform: 'translateY(0)', opacity: '1' },      // End at the middle
          '100%': { transform: 'translateY(0)', opacity: '1' },     // Stay in the middle
        },
      },
  },
  plugins: [],
}
}

