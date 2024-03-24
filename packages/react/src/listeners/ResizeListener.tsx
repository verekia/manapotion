import { useEffect } from 'react'

import { mountResizeListener, ResizeListenerProps } from '@manapotion/core'

export const ResizeListener = ({ onUpdate }: ResizeListenerProps) => {
  useEffect(() => mountResizeListener({ onUpdate }), [onUpdate])

  return null
}
