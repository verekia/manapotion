import { useEffect } from 'react'

import { handleVisibilityChange } from '@manapotion/core'

export type PageVisibilityListenerProps = {
  onVisibilityChange?: (isVisible: boolean) => void
}

export const PageVisibilityListener = ({ onVisibilityChange }: PageVisibilityListenerProps) => {
  useEffect(() => {
    const handler = handleVisibilityChange({ onChange: onVisibilityChange })

    document.addEventListener('visibilitychange', handler)

    return () => document.removeEventListener('visibilitychange', handler)
  }, [onVisibilityChange])

  return null
}
