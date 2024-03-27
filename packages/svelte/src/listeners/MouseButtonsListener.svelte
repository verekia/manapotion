<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import {
    LeftMouseDownPayload,
    LeftMouseUpPayload,
    MiddleMouseDownPayload,
    MiddleMouseUpPayload,
    mountMouseButtonsListener,
    RightMouseDownPayload,
    RightMouseUpPayload,
  } from '@manapotion/core'

  const dispatch = createEventDispatcher<{
    leftMouseDown: LeftMouseDownPayload
    leftMouseUp: LeftMouseUpPayload
    middleMouseDown: MiddleMouseDownPayload
    middleMouseUp: MiddleMouseUpPayload
    rightMouseDown: RightMouseDownPayload
    rightMouseUp: RightMouseUpPayload
  }>()

  onMount(() =>
    mountMouseButtonsListener({
      onLeftMouseDown: payload => dispatch('leftMouseDown', payload),
      onLeftMouseUp: payload => dispatch('leftMouseUp', payload),
      onMiddleMouseDown: payload => dispatch('middleMouseDown', payload),
      onMiddleMouseUp: payload => dispatch('middleMouseUp', payload),
      onRightMouseDown: payload => dispatch('rightMouseDown', payload),
      onRightMouseUp: payload => dispatch('rightMouseUp', payload),
    }),
  )
</script>
