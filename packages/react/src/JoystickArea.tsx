import { useEffect, useRef } from 'react'

import { mountJoystickArea } from '@manapotion/core'

import type { JoystickAreaProps } from '@manapotion/core'
import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren, RefObject } from 'react'

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

type JoystickAreaBaseProps = PropsWithChildren<
  Omit<JoystickAreaProps, 'element'> & {
    containerProps: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    ref?: RefObject<HTMLDivElement>
  }
>

export const JoystickArea = ({
  mode,
  joystick,
  maxFollowDistance,
  maxOriginDistance,
  onEnd,
  onMove,
  onStart,
  containerProps,
  children,
  ref,
}: JoystickAreaBaseProps) => {
  const localRef = useRef<HTMLDivElement>(null)
  const mergedRefs = mergeRefs([localRef, ref])

  useEffect(
    () =>
      mountJoystickArea({
        mode,
        joystick,
        maxFollowDistance,
        maxOriginDistance,
        onEnd,
        onMove,
        onStart,
        element: localRef.current!,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, joystick, maxFollowDistance, maxOriginDistance],
  )

  return (
    <div ref={mergedRefs} {...containerProps}>
      {children}
    </div>
  )
}
