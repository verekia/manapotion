import { mp } from '../store'

export const handleResize =
  ({
    onResize,
  }: {
    onResize?: (params: {
      width: number
      height: number
      isLandscape: boolean
      isPortrait: boolean
    }) => void
  }) =>
  () => {
    const width = window.innerWidth
    const height = window.innerHeight

    mp().windowWidth = width
    mp().windowHeight = height
    const isPortrait = height >= width
    const isLandscape = width > height
    mp().isPortrait = isPortrait
    mp().isLandscape = isLandscape
    onResize?.({ width, height, isPortrait, isLandscape })
  }
