module.exports = {
  /** @type {import('tailwindcss').Config} */
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'bg-dark': '#000000',
        'bg-card': '#0c0c0c',
        'bg-elevated': '#111111',
        'bg-hover': '#141414',
        'text-primary': '#f0f0f0',
        'text-secondary': '#a0a0a0',
        'text-muted': '#707070',
        'border-color': '#1c1c1c',
        primary: {
          DEFAULT: '#d50032',
          light: '#ff3d2e',
          dark: '#a80028',
        },
        secondary: {
          light: '#f8f9fa',
          DEFAULT: '#e9ecef',
          dark: '#dee2e6',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #d50032 0%, #ff3d2e 100%)',
      },
      maxWidth: {
        'site': '1400px',
      },
      aspectRatio: {
        'poster': '2 / 3',
        'hero': '21 / 9',
        'hero-sm': '16 / 9',
      },
    },
  },
  plugins: [],
};
