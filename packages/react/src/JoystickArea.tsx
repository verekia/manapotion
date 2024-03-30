import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
} from 'react'

import { Joystick } from '@manapotion/core'

const { sin, cos, sqrt, pow, atan2 } = Math
const pi = Math.PI

type JoystickAreaProps = {
  joystick: Joystick
  maxFollowDistance?: number
  maxOriginDistance?: number
  onStart?: (joystick: Joystick) => void
  onMove?: (joystick: Joystick) => void
  onEnd?: (joystick: Joystick) => void
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

// react-merge-refs v2.1.1
function mergeRefs<T = unknown>(
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

      const target = e.target as HTMLDivElement
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

      // Follow mode

      if (maxFollowDistance !== undefined) {
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

        const target = e.target as HTMLDivElement
        const rect = target.getBoundingClientRect()

        const fingerPositionX = touch.clientX - rect.left
        const fingerPositionY = rect.height - (touch.clientY - rect.top)

        const fingerOriginDistance = sqrt(
          pow(fingerPositionX - joystick.origin.x, 2) + pow(fingerPositionY - joystick.origin.y, 2),
        )

        joystick.origin.angle =
          (atan2(fingerPositionY - joystick.origin.y, fingerPositionX - joystick.origin.x) +
            2 * pi) %
          (2 * pi)

        const currentX =
          maxOriginDistance !== undefined
            ? joystick.origin.x +
              Math.min(fingerOriginDistance, maxOriginDistance) * cos(joystick.origin.angle)
            : touch.clientX - rect.left
        const currentY =
          maxOriginDistance !== undefined
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

        if (maxOriginDistance !== undefined) {
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

        // Follow case

        if (maxFollowDistance !== undefined) {
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
              (atan2(currentY - joystick.follow.y, currentX - joystick.follow.x) + 2 * pi) %
              (2 * pi)

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

        resetMovementTimeoutRef.current && clearTimeout(resetMovementTimeoutRef.current)
        resetMovementTimeoutRef.current = setTimeout(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joystick, maxFollowDistance, maxOriginDistance])

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
