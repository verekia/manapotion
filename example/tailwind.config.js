/** @type {import('tailwindcss').Config} */
import { tailwindTheme } from 'manapotion'

export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    screens: tailwindTheme.screens,
    extend: {
      screens: tailwindTheme.extend.screens,
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
}
