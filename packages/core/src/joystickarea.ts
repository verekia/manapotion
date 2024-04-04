import { Joystick } from './stores/joysticksStore'

const { sin, cos, sqrt, pow, atan2 } = Math
const pi = Math.PI

export type JoystickAreaProps = {
  joystick: Joystick
  mode?: 'origin' | 'follow'
  element: HTMLElement
  maxFollowDistance?: number
  maxOriginDistance?: number
  onStart?: (joystick: Joystick) => void
  onMove?: (joystick: Joystick) => void
  onEnd?: (joystick: Joystick) => void
}

export const mountJoystickArea = ({
  joystick,
  mode = 'follow',
  maxFollowDistance = 50,
  maxOriginDistance = 50,
  element,
  onStart,
  onEnd,
  onMove,
}: JoystickAreaProps) => {
  if (!joystick) {
    console.error('JoystickArea: an joystick object is required')
  }

  let resetMovementTimeout: ReturnType<typeof setTimeout> | null = null
  let endResetTimeout: ReturnType<typeof setTimeout> | null = null

  const resetJoystick = () => {
    if (!joystick) {
      return
    }
    joystick.identifier = null
    joystick.isActive = false
    joystick.origin.x = null
    joystick.origin.y = null
    joystick.origin.angle = null
    joystick.origin.distance = null
    joystick.origin.distanceRatio = null
    joystick.follow.x = null
    joystick.follow.y = null
    joystick.follow.angle = null
    joystick.follow.distance = null
    joystick.follow.distanceRatio = null
    joystick.current.x = null
    joystick.current.y = null
    joystick.movement.x = 0
    joystick.movement.y = 0
  }

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault()

    const touch = e.changedTouches.item(0)

    if (!touch || !joystick || joystick.identifier != undefined) {
      return
    }

    const target = e.target as HTMLElement
    const rect = target.getBoundingClientRect()
    const currentX = touch.clientX - rect.left
    const currentY = rect.height - (touch.clientY - rect.top)

    joystick.identifier = touch.identifier
    joystick.isActive = true
    joystick.origin.x = currentX
    joystick.origin.y = currentY
    joystick.origin.angle = 0
    joystick.origin.distance = 0
    joystick.origin.distanceRatio = 0

    if (mode === 'follow') {
      joystick.follow.x = currentX
      joystick.follow.y = currentY
      joystick.follow.angle = 0
      joystick.follow.distance = 0
      joystick.follow.distanceRatio = 0
    }

    joystick.current.x = currentX
    joystick.current.y = currentY
    joystick.movement.x = 0
    joystick.movement.y = 0

    onStart?.(joystick)
  }

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()

    if (!joystick) {
      return
    }

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i)

      if (!touch || joystick.identifier !== touch.identifier) {
        continue
      }

      if (
        joystick.origin.x === null ||
        joystick.origin.y === null ||
        joystick.current.x === null ||
        joystick.current.y === null
      ) {
        continue
      }

      const target = e.target as HTMLElement
      const rect = target.getBoundingClientRect()

      const fingerPositionX = touch.clientX - rect.left
      const fingerPositionY = rect.height - (touch.clientY - rect.top)

      const fingerOriginDistance = sqrt(
        pow(fingerPositionX - joystick.origin.x, 2) + pow(fingerPositionY - joystick.origin.y, 2),
      )

      joystick.origin.angle =
        (atan2(fingerPositionY - joystick.origin.y, fingerPositionX - joystick.origin.x) + 2 * pi) %
        (2 * pi)

      const currentX =
        mode === 'origin'
          ? joystick.origin.x +
            Math.min(fingerOriginDistance, maxOriginDistance) * cos(joystick.origin.angle)
          : touch.clientX - rect.left
      const currentY =
        mode === 'origin'
          ? joystick.origin.y +
            Math.min(fingerOriginDistance, maxOriginDistance) * sin(joystick.origin.angle)
          : rect.height - (touch.clientY - rect.top)

      joystick.movement.x = currentX - joystick.current.x
      joystick.movement.y = currentY - joystick.current.y
      joystick.current.x = currentX
      joystick.current.y = currentY

      joystick.origin.distance = sqrt(
        pow(currentX - joystick.origin.x, 2) + pow(currentY - joystick.origin.y, 2),
      )

      if (mode === 'origin') {
        if (joystick.origin.distance > maxOriginDistance - 0.01) {
          joystick.origin.distance = maxOriginDistance
        }
      }

      joystick.origin.distanceRatio = maxOriginDistance
        ? joystick.origin.distance / maxOriginDistance
        : 1
      if (joystick.origin.distanceRatio > 0.99) {
        joystick.origin.distanceRatio = 1
      }

      if (mode === 'follow') {
        if (joystick.follow.x !== null && joystick.follow.y !== null) {
          joystick.follow.angle =
            (atan2(fingerPositionY - joystick.follow.y, fingerPositionX - joystick.follow.x) +
              2 * pi) %
            (2 * pi)

          joystick.follow.distance = sqrt(
            pow(currentX - joystick.follow.x, 2) + pow(currentY - joystick.follow.y, 2),
          )
          if (joystick.follow.distance > maxFollowDistance - 0.01) {
            joystick.follow.distance = maxFollowDistance
          }

          joystick.follow.distanceRatio = maxFollowDistance
            ? joystick.follow.distance / maxFollowDistance
            : 1

          joystick.follow.angle =
            (atan2(currentY - joystick.follow.y, currentX - joystick.follow.x) + 2 * pi) % (2 * pi)

          if (joystick.follow.distance >= maxFollowDistance) {
            const oppositeFollowAngle = Math.atan2(
              joystick.follow.y - currentY,
              joystick.follow.x - currentX,
            )
            joystick.follow.x = currentX + maxFollowDistance * cos(oppositeFollowAngle)
            joystick.follow.y = currentY + maxFollowDistance * sin(oppositeFollowAngle)
          }
        }
      }

      joystick.origin.angle =
        (atan2(currentY - joystick.origin.y, currentX - joystick.origin.x) + 2 * pi) % (2 * pi)

      onMove?.(joystick)

      resetMovementTimeout && clearTimeout(resetMovementTimeout)
      resetMovementTimeout = setTimeout(() => {
        if (joystick && joystick.identifier !== undefined) {
          joystick.movement.x = 0
          joystick.movement.y = 0

          onMove?.(joystick)
        }
      }, 70)
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault()

    if (!joystick) {
      return
    }

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches.item(i)

      if (!touch || joystick.identifier !== touch.identifier) {
        continue
      }

      joystick.movement.x = 0
      joystick.movement.y = 0

      onEnd?.(joystick)

      endResetTimeout = setTimeout(() => {
        resetJoystick()
        onEnd?.(joystick)
      }, 50)
    }
  }

  // Binding events by ref instead of JSX attributes to make them active instead of passive
  // and have access to e.preventDefault(). Without e.preventDefault(), the UI is no longer
  // interactable while joysticks are moving due to touchmove.
  element.addEventListener('touchstart', handleTouchStart /*, { passive: false } */)
  element.addEventListener('touchmove', handleTouchMove /*, { passive: false } */)
  element.addEventListener('touchend', handleTouchEnd /*, { passive: false } */)

  return () => {
    resetMovementTimeout && clearTimeout(resetMovementTimeout)
    endResetTimeout && clearTimeout(endResetTimeout)
    element.removeEventListener('touchstart', handleTouchStart)
    element.removeEventListener('touchmove', handleTouchMove)
    element.removeEventListener('touchend', handleTouchEnd)
  }
}
