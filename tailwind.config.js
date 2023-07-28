/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',

    // Path to the Tremor module
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      colors: {
        colors: {
          accent: {
            1: 'hsl(var(--color-accent1) / <alpha-value>)',
            2: 'hsl(var(--color-accent2) / <alpha-value>)'
          },
          bkg: 'hsl(var(--color-bkg) / <alpha-value>)',
          content: 'hsl(var(--color-content) / <alpha-value>)'
        }
      }
    }
  },
  plugins: []
}
