import { useEffect } from 'react'

import { mountFullscreenListener } from '@manapotion/core'

import type { FullscreenListenerProps } from '@manapotion/core'

export const FullscreenListener = ({ onFullscreenChange }: FullscreenListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountFullscreenListener({ onFullscreenChange }), [])

  return null
}
