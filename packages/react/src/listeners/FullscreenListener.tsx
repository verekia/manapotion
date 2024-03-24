import { useEffect } from 'react'

import { FullscreenListenerProps, mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = ({ onFullscreenChange }: FullscreenListenerProps) => {
  useEffect(() => mountFullscreenListener({ onFullscreenChange }), [])

  return null
}
