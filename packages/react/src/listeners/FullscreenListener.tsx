import { useEffect } from 'react'

import { FullscreenListenerProps, mountFullscreenListener } from '@manapotion/core'

export const FullscreenListener = ({ onUpdate }: FullscreenListenerProps) => {
  useEffect(() => mountFullscreenListener({ onUpdate }), [onUpdate])

  return null
}
