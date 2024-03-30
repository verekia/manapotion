import { useEffect } from 'react'

import { DeviceTypeListenerProps, mountDeviceTypeListener } from '@manapotion/core'

export const DeviceTypeListener = ({ onDeviceTypeChange }: DeviceTypeListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountDeviceTypeListener({ onDeviceTypeChange }), [])

  return null
}
