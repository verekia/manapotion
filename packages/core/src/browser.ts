/* eslint-disable @typescript-eslint/no-explicit-any */

export const enterFullscreen = () => {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen()
  } else if ((document.documentElement as any).mozRequestFullScreen) {
    ;(document.documentElement as any).mozRequestFullScreen()
  } else if ((document.documentElement as any).webkitRequestFullscreen) {
    ;(document.documentElement as any).webkitRequestFullscreen()
  } else if ((document.documentElement as any).msRequestFullscreen) {
    ;(document.documentElement as any).msRequestFullscreen()
  }
}

export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if ((document as any).mozCancelFullScreen) {
    ;(document as any).mozCancelFullScreen()
  } else if ((document as any).webkitExitFullscreen) {
    ;(document as any).webkitExitFullscreen()
  } else if ((document as any).msExitFullscreen) {
    ;(document as any).msExitFullscreen()
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
    ;(screen.orientation.lock as any)(type)
  }
}

export const unlockOrientation = () => {
  if ('unlock' in screen.orientation) {
    screen.orientation.unlock()
  }
}

export const lockKeys = (keys: string[]) => {
  if (
    'keyboard' in navigator &&
    navigator.keyboard &&
    'lock' in (navigator.keyboard as any) &&
    (navigator.keyboard as any).lock
  ) {
    ;((navigator.keyboard as any).lock as any)(keys)
  }
}

export const unlockKeys = () => {
  if (
    'keyboard' in navigator &&
    navigator.keyboard &&
    'unlock' in (navigator.keyboard as any) &&
    (navigator.keyboard as any).unlock
  ) {
    ;((navigator.keyboard as any).unlock as any)()
  }
}

export const lockPointer = () => document.body.requestPointerLock()

export const unlockPointer = () => document.exitPointerLock()
