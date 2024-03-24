import { useEffect } from 'react'

import { DeviceTypeListenerProps, mountDeviceTypeListener } from '@manapotion/core'

export const DeviceTypeListener = ({ onUpdate }: DeviceTypeListenerProps) => {
  useEffect(() => mountDeviceTypeListener({ onUpdate }), [onUpdate])

  return null
}
