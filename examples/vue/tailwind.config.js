/** @type {import('tailwindcss').Config} */
import { theme } from '@manapotion/tailwind'

export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    screens: theme.screens,
    extend: {
      screens: theme.extend.screens,
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
}
