import { useEffect } from 'react'

import { mountResizeListener, ResizeListenerProps } from '@manapotion/core'

export const ResizeListener = ({ onResize }: ResizeListenerProps) => {
  useEffect(() => mountResizeListener({ onResize }), [onResize])

  return null
}
