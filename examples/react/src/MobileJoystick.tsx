import { useRef, useState } from 'react'

import { getJoysticks, JoystickArea, useFrameEffect } from '@manapotion/r3f'

const MobileJoystick = () => {
  const joystickCurrentRef = useRef<HTMLDivElement>(null)
  const joystickOriginRef = useRef<HTMLDivElement>(null)
  const joystickFollowRef = useRef<HTMLDivElement>(null)
  const [isHelperShown, setIsHelperShown] = useState(true)

  useFrameEffect(() => {
    const joystick = getJoysticks().movement

    if (!joystickCurrentRef.current || !joystickFollowRef.current || !joystickOriginRef.current) {
      return
    }

    joystickCurrentRef.current.style.opacity = joystick.isActive ? '1' : '0'
    joystickFollowRef.current.style.opacity =
      joystick.isActive && joystick.follow.distance ? '1' : '0'
    joystickOriginRef.current.style.opacity =
      joystick.isActive && !joystick.follow.distance ? '1' : '0'

    if (
      joystick.current.y === null ||
      joystick.current.x === null ||
      joystick.origin.x === null ||
      joystick.origin.y === null
    ) {
      return
    }

    joystickCurrentRef.current.style.transform = `translate(${joystick.current.x}px, ${-joystick.current.y}px)`
    joystickOriginRef.current.style.transform = `translate(${joystick.origin.x}px, ${-joystick.origin.y}px)`

    if (joystick.follow.x === null || joystick.follow.y === null) {
      return
    }

    joystickFollowRef.current.style.transform = `translate(${joystick.follow.x}px, ${-joystick.follow.y}px)`
  })

  return (
    <JoystickArea
      joystick={getJoysticks().movement}
      maxFollowDistance={50}
      className="absolute left-1/2 top-1/2 z-10 size-56 -translate-x-1/2 -translate-y-1/2 border border-blue-500 desktop:hidden"
      onStart={() => setIsHelperShown(false)}
    >
      {isHelperShown && (
        <div className="pointer-events-none absolute flex size-full select-none items-center justify-center">
          Touch here
        </div>
      )}
      <div
        ref={joystickCurrentRef}
        className="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-red-500 opacity-0 transition-opacity"
      />
      <div
        ref={joystickOriginRef}
        className="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-blue-500 opacity-0 transition-opacity"
      />
      <div
        ref={joystickFollowRef}
        className="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-green-500 opacity-0 transition-opacity"
      />
    </JoystickArea>
  )
}

export default MobileJoystick
