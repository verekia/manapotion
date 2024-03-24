import { mp } from '../store'

export const mountResizeListener = ({
  onUpdate,
}: {
  onUpdate?: ({
    width,
    height,
    isPortrait,
    isLandscape,
  }: {
    width: number
    height: number
    isLandscape: boolean
    isPortrait: boolean
  }) => void
}) => {
  const handler = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    mp().windowWidth = width
    mp().windowHeight = height
    const isPortrait = height >= width
    const isLandscape = width > height
    mp().isPortrait = isPortrait
    mp().isLandscape = isLandscape
    onUpdate?.({ width, height, isPortrait, isLandscape })
  }

  handler()

  window.addEventListener('resize', handler)

  return () => window.removeEventListener('resize', handler)
}
