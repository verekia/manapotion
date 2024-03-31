import { enterFullscreen, exitFullscreen, useBrowser } from '@manapotion/r3f'

import Label from './Label'

export const FullscreenLabel = () => (
  <Label name="isFullscreen" value={useBrowser(s => s.isFullscreen)} />
)

export const PageFocusLabel = () => (
  <Label name="isPageFocused" value={useBrowser(s => s.isPageFocused)} />
)

export const PageVisibilityLabel = () => (
  <Label name="isPageVisible" value={useBrowser(s => s.isPageVisible)} />
)

export const IsPortraitLabel = () => (
  <Label name="isPortrait" value={useBrowser(s => s.isPortrait)} />
)

export const IsLandscapeLabel = () => (
  <Label name="isLandscape" value={useBrowser(s => s.isLandscape)} />
)

export const IsMobileLabel = () => <Label name="isMobile" value={useBrowser(s => s.isMobile)} />

export const IsDesktopLabel = () => <Label name="isDesktop" value={useBrowser(s => s.isDesktop)} />

export const FullscreenButton = () => {
  const isFullscreen = useBrowser(s => s.isFullscreen)

  return (
    <button onClick={isFullscreen ? exitFullscreen : enterFullscreen} className="btn">
      {isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    </button>
  )
}
