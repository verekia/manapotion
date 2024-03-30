import { manaPotionStore } from '../store'

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
    manaPotionStore.setState(s => ({ ...s, browser: { ...s.browser, isDesktop, isMobile } }))
    onDeviceTypeChange?.({ isDesktop, isMobile })
  }

  handler()

  desktopQuery.addEventListener('change', handler)

  return () => desktopQuery.removeEventListener('change', handler)
}
