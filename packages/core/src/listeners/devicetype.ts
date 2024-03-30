import { browserStore } from '../stores/browserStore'

export type DeviceTypeChangePayload = { isDesktop: boolean; isMobile: boolean }

export type DeviceTypeListenerProps = {
  onDeviceTypeChange?: (payload: DeviceTypeChangePayload) => void
}

export const mountDeviceTypeListener = ({ onDeviceTypeChange }: DeviceTypeListenerProps) => {
  const desktopQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  const mobileQuery = window.matchMedia('(hover: none) and (pointer: coarse)')

  const handler = () => {
    const isDesktop = desktopQuery.matches
    const isMobile = mobileQuery.matches
    browserStore.setState(s => ({ ...s, isDesktop, isMobile }))
    onDeviceTypeChange?.({ isDesktop, isMobile })
  }

  handler()

  desktopQuery.addEventListener('change', handler)

  return () => desktopQuery.removeEventListener('change', handler)
}
