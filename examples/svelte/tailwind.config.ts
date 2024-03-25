import { theme } from '@manapotion/tailwind'

import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.svelte'],
  theme: {
    screens: theme.screens,
    extend: {
      screens: theme.extend.screens,
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
} satisfies Config
