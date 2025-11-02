import { browserStore } from '../stores/browserStore'

export type DeviceTypeChangePayload = { isDesktop: boolean; isMobile: boolean }

export type DeviceTypeListenerProps = {
  onDeviceTypeChange?: (payload: DeviceTypeChangePayload) => void
}

export const mountDeviceTypeListener = ({ onDeviceTypeChange }: DeviceTypeListenerProps) => {
  const desktopQuery = window.matchMedia('(hover: hover) and (pointer: fine)')

  const update = () => {
    const isDesktop = desktopQuery.matches
    const isMobile = !isDesktop
    const payload: DeviceTypeChangePayload = { isDesktop, isMobile }
    browserStore.setState(s => ({ ...s, ...payload }))
    return payload
  }

  const handleChange = () => {
    const payload = update()
    onDeviceTypeChange?.(payload)
  }

  update()

  desktopQuery.addEventListener('change', handleChange)

  return () => desktopQuery.removeEventListener('change', handleChange)
}
