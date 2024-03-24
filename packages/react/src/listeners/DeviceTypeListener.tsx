import { useEffect } from 'react'

import { DeviceTypeListenerProps, mountDeviceTypeListener } from '@manapotion/core'

export const DeviceTypeListener = ({ onDeviceTypeChange }: DeviceTypeListenerProps) => {
  useEffect(() => mountDeviceTypeListener({ onDeviceTypeChange }), [onDeviceTypeChange])

  return null
}
