import { tailwindTheme as manapotionTheme } from '@manapotion/vanilla'

import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.ts'],
  theme: {
    screens: manapotionTheme.screens,
    extend: {
      screens: manapotionTheme.extend.screens,
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
} satisfies Config
