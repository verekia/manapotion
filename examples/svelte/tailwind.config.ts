// For some reason, Prettier chokes on importing the theme from @manapotion/svelte
// Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined
import { tailwindTheme as manapotionTheme } from '@manapotion/core'

import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.svelte'],
  theme: {
    screens: manapotionTheme.screens,
    extend: {
      screens: manapotionTheme.extend.screens,
    },
  },
  plugins: [],
  future: { hoverOnlyWhenSupported: true },
} satisfies Config
