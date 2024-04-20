import { useEffect } from 'react'

import { mountDeviceTypeListener } from '@manapotion/core'

import type { DeviceTypeListenerProps } from '@manapotion/core'

export const DeviceTypeListener = ({ onDeviceTypeChange }: DeviceTypeListenerProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => mountDeviceTypeListener({ onDeviceTypeChange }), [])

  return null
}
