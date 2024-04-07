<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountJoystickArea } from '@manapotion/core'
  import { get, writable } from 'svelte/store'

  import type { Joystick } from '@manapotion/core'

  export let mode: 'follow' | 'origin' | undefined = undefined
  export let joystick: Joystick
  export let maxFollowDistance: number | undefined = undefined
  export let maxOriginDistance: number | undefined = undefined
  export let containerProps = {}

  const modeStore = writable<'follow' | 'origin' | undefined>(mode)

  const dispatch = createEventDispatcher<{ start: Joystick; move: Joystick; end: Joystick }>()

  let divElement: HTMLDivElement

  $: modeStore.set(mode), mode

  onMount(() => {
    let unsub = mountJoystickArea({
      mode: get(modeStore),
      joystick,
      maxFollowDistance,
      maxOriginDistance,
      onEnd: joystick => dispatch('end', joystick),
      onMove: joystick => dispatch('move', joystick),
      onStart: joystick => dispatch('start', joystick),
      element: divElement,
    })

    const unsubscribeMode = modeStore.subscribe(newMode => {
      unsub()
      unsub = mountJoystickArea({
        mode: newMode,
        joystick,
        maxFollowDistance,
        maxOriginDistance,
        onEnd: joystick => dispatch('end', joystick),
        onMove: joystick => dispatch('move', joystick),
        onStart: joystick => dispatch('start', joystick),
        element: divElement,
      })
    })

    return () => {
      unsub()
      unsubscribeMode()
    }
  })
</script>

<div bind:this={divElement} {...containerProps}>
  <slot />
</div>
