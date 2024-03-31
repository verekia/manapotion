import { lockPointer, unlockPointer, useMouse } from '@manapotion/r3f'

import Label from './Label'

export const MouseLockedLabel = () => <Label name="mouse locked" value={useMouse(s => s.locked)} />

export const PointerLockButton = () => {
  const locked = useMouse(s => s.locked)

  return (
    <button onClick={locked ? unlockPointer : lockPointer} className="btn">
      {locked ? 'Unlock' : 'Lock'}
    </button>
  )
}

export const LeftMouseButtonDownLabel = () => (
  <Label name="left mouse button down" value={useMouse(s => s.buttons.left)} />
)

export const RightMouseButtonDownLabel = () => (
  <Label name="right mouse button down" value={useMouse(s => s.buttons.right)} />
)

export const MiddleMouseButtonDownLabel = () => (
  <Label name="middle mouse button down" value={useMouse(s => s.buttons.middle)} />
)
