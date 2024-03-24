import { mp } from '../store'

export const mountDeviceTypeListener = ({
  onUpdate,
}: {
  onUpdate?: ({ isDesktop, isMobile }: { isDesktop: boolean; isMobile: boolean }) => void
}) => {
  const desktopQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  const mobileQuery = window.matchMedia('(hover: none) and (pointer: coarse)')

  const handler = () => {
    const isDesktop = desktopQuery.matches
    const isMobile = mobileQuery.matches
    mp().setDeviceType({ isDesktop, isMobile })
    onUpdate?.({ isDesktop, isMobile })
  }

  handler()

  desktopQuery.addEventListener('change', handler)

  return () => desktopQuery.removeEventListener('change', handler)
}
