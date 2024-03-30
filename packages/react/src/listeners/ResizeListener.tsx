import { useEffect } from 'react'

import { mountResizeListener, ResizeListenerProps } from '@manapotion/core'

export const ResizeListener = ({ onResize }: ResizeListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountResizeListener({ onResize }), [])

  return null
}
