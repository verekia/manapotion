/* eslint-disable @typescript-eslint/no-explicit-any */

export const enterFullscreen = () => {
  if (document.documentElement.requestFullscreen) {
    return document.documentElement.requestFullscreen()
  }

  if ((document.documentElement as any).mozRequestFullScreen) {
    return (document.documentElement as any).mozRequestFullScreen()
  }

  if ((document.documentElement as any).webkitRequestFullscreen) {
    return (document.documentElement as any).webkitRequestFullscreen()
  }

  if ((document.documentElement as any).msRequestFullscreen) {
    return (document.documentElement as any).msRequestFullscreen()
  }
}

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    return document.exitFullscreen()
  }

  if ((document as any).mozCancelFullScreen) {
    return (document as any).mozCancelFullScreen()
  }

  if ((document as any).webkitExitFullscreen) {
    return (document as any).webkitExitFullscreen()
  }

  if ((document as any).msExitFullscreen) {
    return (document as any).msExitFullscreen()
  }
}

type OrientationLockType =
  | 'any'
  | 'landscape'
  | 'landscape-primary'
  | 'landscape-secondary'
  | 'natural'
  | 'portrait'
  | 'portrait-primary'
  | 'portrait-secondary'

export const lockOrientation = (type: OrientationLockType) => {
  if (screen.orientation.type.startsWith(type)) {
    return
  }
  if ('lock' in screen.orientation) {
    return (screen.orientation.lock as any)(type)
  }
}

export const unlockOrientation = () => {
  if ('unlock' in screen.orientation) {
    return screen.orientation.unlock()
  }
}

export const lockKeys = (keys: string[]) => {
  if (
    'keyboard' in navigator &&
    navigator.keyboard &&
    'lock' in (navigator.keyboard as any) &&
    (navigator.keyboard as any).lock
  ) {
    return ((navigator.keyboard as any).lock as any)(keys)
  }
}

export const unlockKeys = () => {
  if (
    'keyboard' in navigator &&
    navigator.keyboard &&
    'unlock' in (navigator.keyboard as any) &&
    (navigator.keyboard as any).unlock
  ) {
    return ((navigator.keyboard as any).unlock as any)()
  }
}

export const lockPointer = (options?: PointerLockOptions) =>
  'requestPointerLock' in document.body && document.body.requestPointerLock?.(options)

export const unlockPointer = () => 'exitPointerLock' in document && document.exitPointerLock?.()
