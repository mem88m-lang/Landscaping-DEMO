/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ge: {
          black:   '#060908',
          dark:    '#0D1A0C',
          surface: '#121F11',
          border:  '#1E3A1C',
          green: {
            deep:   '#1E4D1B',
            mid:    '#2E6B29',
            bright: '#4A9442',
            light:  '#72C469',
          },
          gold:    '#C9A84C',
          cream:   '#F0EDE4',
          text: {
            primary: '#EDF2EB',
            muted:   '#8BA885',
            dim:     '#4E6B4B',
          },
          winter: '#3B6B8A',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'line-grow':  'lineGrow 0.8s ease forwards',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        lineGrow: { from: { scaleX: '0' }, to: { scaleX: '1' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
}
