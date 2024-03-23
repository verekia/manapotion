import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
} from 'react'

const { sin, cos, sqrt, pow, atan2 } = Math
const pi = Math.PI

export type Joystick = {
  isActive: boolean
  identifier: number | null
  originX: number | null
  originY: number | null
  originAngle: number | null
  originDistance: number | null
  originDistanceRatio: number | null
  followX: number | null
  followY: number | null
  followAngle: number | null
  followDistance: number | null
  followDistanceRatio: number | null
  currentX: number | null
  currentY: number | null
  movementX: number
  movementY: number
}

export const createJoystick = (): Joystick => ({
  isActive: false,
  identifier: null,
  originX: null,
  originY: null,
  originAngle: null,
  originDistance: null,
  originDistanceRatio: null,
  followX: null,
  followY: null,
  followAngle: null,
  followDistance: null,
  followDistanceRatio: null,
  currentX: null,
  currentY: null,
  movementX: 0,
  movementY: 0,
})

type JoystickAreaProps = {
  joystick: Joystick
  maxFollowDistance?: number
  maxOriginDistance?: number
  onStart?: (joystick: Joystick) => void
  onMove?: (joystick: Joystick) => void
  onEnd?: (joystick: Joystick) => void
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

// react-merge-refs v2.1.1
function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>,
): React.RefCallback<T> {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

const JoystickAreaBase = (
  {
    joystick,
    maxFollowDistance,
    maxOriginDistance,
    onStart,
    onMove,
    onEnd,
    ...props
  }: JoystickAreaProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const localRef = useRef<HTMLDivElement>(null)
  const resetMovementTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const endResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const mergedRefs = mergeRefs([localRef, ref])

  useEffect(() => {
    const resetJoystick = () => {
      if (!joystick) {
        return
      }
      joystick.identifier = null
      joystick.isActive = false
      joystick.originX = null
      joystick.originY = null
      joystick.originAngle = null
      joystick.originDistance = null
      joystick.originDistanceRatio = null
      joystick.followX = null
      joystick.followY = null
      joystick.followAngle = null
      joystick.followDistance = null
      joystick.followDistanceRatio = null
      joystick.currentX = null
      joystick.currentY = null
      joystick.movementX = 0
      joystick.movementY = 0
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()

      const touch = e.changedTouches.item(0)

      if (!touch || !joystick || joystick.identifier != undefined) {
        return
      }

      const target = e.target as HTMLDivElement
      const rect = target.getBoundingClientRect()
      const currentX = touch.clientX - rect.left
      const currentY = rect.height - (touch.clientY - rect.top)

      joystick.identifier = touch.identifier
      joystick.isActive = true
      joystick.originX = currentX
      joystick.originY = currentY
      joystick.originAngle = 0
      joystick.originDistance = 0
      joystick.originDistanceRatio = 0

      // Follow mode

      if (maxFollowDistance !== undefined) {
        joystick.followX = currentX
        joystick.followY = currentY
        joystick.followAngle = 0
        joystick.followDistance = 0
        joystick.followDistanceRatio = 0
      }

      joystick.currentX = currentX
      joystick.currentY = currentY
      joystick.movementX = 0
      joystick.movementY = 0

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
          joystick.originX === null ||
          joystick.originY === null ||
          joystick.currentX === null ||
          joystick.currentY === null
        ) {
          continue
        }

        const target = e.target as HTMLDivElement
        const rect = target.getBoundingClientRect()

        const fingerPositionX = touch.clientX - rect.left
        const fingerPositionY = rect.height - (touch.clientY - rect.top)

        const fingerOriginDistance = sqrt(
          pow(fingerPositionX - joystick.originX, 2) + pow(fingerPositionY - joystick.originY, 2),
        )

        joystick.originAngle =
          (atan2(fingerPositionY - joystick.originY, fingerPositionX - joystick.originX) + 2 * pi) %
          (2 * pi)

        const currentX =
          maxOriginDistance !== undefined
            ? joystick.originX +
              Math.min(fingerOriginDistance, maxOriginDistance) * cos(joystick.originAngle)
            : touch.clientX - rect.left
        const currentY =
          maxOriginDistance !== undefined
            ? joystick.originY +
              Math.min(fingerOriginDistance, maxOriginDistance) * sin(joystick.originAngle)
            : rect.height - (touch.clientY - rect.top)

        joystick.movementX = currentX - joystick.currentX
        joystick.movementY = currentY - joystick.currentY
        joystick.currentX = currentX
        joystick.currentY = currentY

        joystick.originDistance = sqrt(
          pow(currentX - joystick.originX, 2) + pow(currentY - joystick.originY, 2),
        )

        if (maxOriginDistance !== undefined) {
          if (joystick.originDistance > maxOriginDistance - 0.01) {
            joystick.originDistance = maxOriginDistance
          }
        }

        joystick.originDistanceRatio = maxOriginDistance
          ? joystick.originDistance / maxOriginDistance
          : 1
        if (joystick.originDistanceRatio > 0.99) {
          joystick.originDistanceRatio = 1
        }

        // Follow case

        if (maxFollowDistance !== undefined) {
          if (joystick.followX !== null && joystick.followY !== null) {
            joystick.followAngle =
              (atan2(fingerPositionY - joystick.followY, fingerPositionX - joystick.followX) +
                2 * pi) %
              (2 * pi)

            joystick.followDistance = sqrt(
              pow(currentX - joystick.followX, 2) + pow(currentY - joystick.followY, 2),
            )
            if (joystick.followDistance > maxFollowDistance - 0.01) {
              joystick.followDistance = maxFollowDistance
            }

            joystick.followDistanceRatio = maxFollowDistance
              ? joystick.followDistance / maxFollowDistance
              : 1

            joystick.followAngle =
              (atan2(currentY - joystick.followY, currentX - joystick.followX) + 2 * pi) % (2 * pi)

            if (joystick.followDistance >= maxFollowDistance) {
              const oppositeFollowAngle = Math.atan2(
                joystick.followY - currentY,
                joystick.followX - currentX,
              )
              joystick.followX = currentX + maxFollowDistance * cos(oppositeFollowAngle)
              joystick.followY = currentY + maxFollowDistance * sin(oppositeFollowAngle)
            }
          }
        }

        joystick.originAngle =
          (atan2(currentY - joystick.originY, currentX - joystick.originX) + 2 * pi) % (2 * pi)

        onMove?.(joystick)

        resetMovementTimeoutRef.current && clearTimeout(resetMovementTimeoutRef.current)
        resetMovementTimeoutRef.current = setTimeout(() => {
          if (joystick && joystick.identifier !== undefined) {
            joystick.movementX = 0
            joystick.movementY = 0

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

        joystick.movementX = 0
        joystick.movementY = 0

        onEnd?.(joystick)

        endResetTimeoutRef.current = setTimeout(() => {
          resetJoystick()
          onEnd?.(joystick)
        }, 50)
      }
    }

    const element = localRef.current

    if (!element) {
      return
    }

    // Binding events by ref instead of JSX attributes to make them active instead of passive
    // and have access to e.preventDefault(). Without e.preventDefault(), the UI is no longer
    // interactable while joysticks are moving due to touchmove.
    element.addEventListener('touchstart', handleTouchStart /*, { passive: false } */)
    element.addEventListener('touchmove', handleTouchMove /*, { passive: false } */)
    element.addEventListener('touchend', handleTouchEnd /*, { passive: false } */)

    return () => {
      resetMovementTimeoutRef.current && clearTimeout(resetMovementTimeoutRef.current)
      endResetTimeoutRef.current && clearTimeout(endResetTimeoutRef.current)
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [joystick, maxFollowDistance, maxOriginDistance, onEnd, onMove, onStart])

  if (!joystick) {
    console.error('JoystickArea: an joystick object is required')
    return null
  }

  if (maxFollowDistance !== undefined && maxOriginDistance !== undefined) {
    console.error('JoystickArea: only one of maxFollowDistance or maxOriginDistance can be defined')
    return null
  }

  if (maxFollowDistance === undefined && maxOriginDistance === undefined) {
    console.error('JoystickArea: maxFollowDistance or maxOriginDistance is required')
    return null
  }

  return <div ref={mergedRefs} {...props} />
}

export const JoystickArea = forwardRef<HTMLDivElement, JoystickAreaProps>(JoystickAreaBase)
JoystickArea.displayName = 'JoystickArea'
