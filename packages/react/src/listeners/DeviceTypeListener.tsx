import { useEffect } from 'react'

import { mountDeviceTypeListener } from '@manapotion/core'

export type DeviceTypeListenerProps = {
  onUpdate?: ({ isDesktop, isMobile }: { isDesktop: boolean; isMobile: boolean }) => void
}

export const DeviceTypeListener = ({ onUpdate }: DeviceTypeListenerProps) => {
  useEffect(() => mountDeviceTypeListener({ onUpdate }), [onUpdate])

  return null
}
