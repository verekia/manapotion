import { useEffect } from 'react'

import { FullscreenListenerProps, mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = ({ onFullscreenChange }: FullscreenListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountFullscreenListener({ onFullscreenChange }), [])

  return null
}
