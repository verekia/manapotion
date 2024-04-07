<script lang="ts">
  import { getJoysticks, JoystickArea } from '@manapotion/svelte'

  import type { Joystick } from '@manapotion/svelte'

  export let mode: 'follow' | 'origin'

  let joystickCurrent: HTMLDivElement
  let joystickOrigin: HTMLDivElement
  let joystickFollow: HTMLDivElement

  const handleStart = ({ detail: joystick }: CustomEvent<Joystick>) => {
    joystickCurrent.style.transform = `translate(${joystick.current.x}px, ${-joystick.current.y!}px)`
    joystickOrigin.style.transform = `translate(${joystick.origin.x}px, ${-joystick.origin.y!}px)`
    joystickFollow.style.transform = `translate(${joystick.follow.x}px, ${-joystick.follow.y!}px)`
    joystickCurrent.style.opacity = '1'
    if (mode === 'follow') joystickFollow.style.opacity = '1'
    joystickOrigin.style.opacity = '1'
  }

  const handleEnd = () => {
    joystickCurrent.style.opacity = '0'
    joystickFollow.style.opacity = '0'
    joystickOrigin.style.opacity = '0'
  }

  const handleMove = ({ detail: joystick }: CustomEvent<Joystick>) => {
    joystickCurrent.style.transform = `translate(${joystick.current.x}px, ${-joystick.current.y!}px)`
    joystickOrigin.style.transform = `translate(${joystick.origin.x}px, ${-joystick.origin.y!}px)`
    joystickFollow.style.transform = `translate(${joystick.follow.x}px, ${-joystick.follow.y!}px)`
  }
</script>

<JoystickArea
  {mode}
  joystick={getJoysticks().movement}
  on:start={handleStart}
  on:move={handleMove}
  on:end={handleEnd}
  containerProps={{ class: `relative z-10 h-48 w-64 rounded-md border border-slate-500 ` }}
>
  <div
    bind:this={joystickCurrent}
    class="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-red-500 opacity-0 transition-opacity"
  />
  <div
    bind:this={joystickOrigin}
    class="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-blue-500 opacity-0 transition-opacity"
  />
  <div
    bind:this={joystickFollow}
    class="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-green-500 opacity-0 transition-opacity"
  />
</JoystickArea>
