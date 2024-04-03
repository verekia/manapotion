import { tailwindTheme as manapotionTheme } from '@manapotion/react'

import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    screens: manapotionTheme.screens,
    extend: {
      screens: manapotionTheme.extend.screens,
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
} satisfies Config
