import { useRef } from 'react'

import { getJoysticks, Joystick, JoystickArea } from '@manapotion/r3f'

const MobileJoystick = ({
  className = '',
  mode = 'follow',
}: {
  className?: string
  mode?: 'follow' | 'origin'
}) => {
  const joystickCurrentRef = useRef<HTMLDivElement>(null)
  const joystickOriginRef = useRef<HTMLDivElement>(null)
  const joystickFollowRef = useRef<HTMLDivElement>(null)

  const handleStart = (joystick: Joystick) => {
    joystickCurrentRef.current!.style.transform = `translate(${joystick.current.x}px, ${-joystick.current.y!}px)`
    joystickOriginRef.current!.style.transform = `translate(${joystick.origin.x}px, ${-joystick.origin.y!}px)`
    joystickFollowRef.current!.style.transform = `translate(${joystick.follow.x}px, ${-joystick.follow.y!}px)`
    joystickCurrentRef.current!.style.opacity = '1'
    mode === 'follow' && (joystickFollowRef.current!.style.opacity = '1')
    joystickOriginRef.current!.style.opacity = '1'
  }

  const handleEnd = () => {
    joystickCurrentRef.current!.style.opacity = '0'
    joystickFollowRef.current!.style.opacity = '0'
    joystickOriginRef.current!.style.opacity = '0'
  }

  const handleMove = (joystick: Joystick) => {
    joystickCurrentRef.current!.style.transform = `translate(${joystick.current.x}px, ${-joystick.current.y!}px)`
    joystickOriginRef.current!.style.transform = `translate(${joystick.origin.x}px, ${-joystick.origin.y!}px)`
    joystickFollowRef.current!.style.transform = `translate(${joystick.follow.x}px, ${-joystick.follow.y!}px)`
  }

  return (
    <JoystickArea
      joystick={getJoysticks().movement}
      {...(mode === 'follow' ? { maxFollowDistance: 50 } : { maxOriginDistance: 50 })}
      className={`relative z-10 h-48 w-64 rounded-md border border-slate-500 ${className}`}
      onStart={handleStart}
      onMove={handleMove}
      onEnd={handleEnd}
    >
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
