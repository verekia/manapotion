import { useRef, useState } from 'react'

import { createJoystick, JoystickArea, useFrameEffect } from 'manapotion'

const joystick = createJoystick()

const MobileJoystick = () => {
  const joystickCurrentRef = useRef<HTMLDivElement>(null)
  const joystickOriginRef = useRef<HTMLDivElement>(null)
  const joystickFollowRef = useRef<HTMLDivElement>(null)
  const [isHelperShown, setIsHelperShown] = useState(true)

  useFrameEffect(() => {
    if (!joystickCurrentRef.current || !joystickFollowRef.current || !joystickOriginRef.current) {
      return
    }

    joystickCurrentRef.current.style.opacity = joystick.isActive ? '1' : '0'
    joystickFollowRef.current.style.opacity =
      joystick.isActive && joystick.followDistance ? '1' : '0'
    joystickOriginRef.current.style.opacity =
      joystick.isActive && !joystick.followDistance ? '1' : '0'

    if (
      joystick.currentY === null ||
      joystick.currentX === null ||
      joystick.originX === null ||
      joystick.originY === null
    ) {
      return
    }

    joystickCurrentRef.current.style.transform = `translate(${joystick.currentX}px, ${-joystick.currentY}px)`
    joystickOriginRef.current.style.transform = `translate(${joystick.originX}px, ${-joystick.originY}px)`

    if (joystick.followX === null || joystick.followY === null) {
      return
    }

    joystickFollowRef.current.style.transform = `translate(${joystick.followX}px, ${-joystick.followY}px)`
  })

  return (
    <JoystickArea
      joystick={joystick}
      maxFollowDistance={50}
      className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-56 z-10 border desktop:hidden border-blue-500"
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
        className="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-green-500 transition-opacity opacity-0"
      />
    </JoystickArea>
  )
}

export default MobileJoystick
