<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountMouseButtonsListener } from '@manapotion/core'

  import type {
    LeftMouseButtonDownPayload,
    LeftMouseButtonUpPayload,
    MiddleMouseButtonDownPayload,
    MiddleMouseButtonUpPayload,
    RightMouseButtonDownPayload,
    RightMouseButtonUpPayload,
  } from '@manapotion/core'

  const dispatch = createEventDispatcher<{
    leftMouseButtonDown: LeftMouseButtonDownPayload
    leftMouseButtonUp: LeftMouseButtonUpPayload
    middleMouseButtonDown: MiddleMouseButtonDownPayload
    middleMouseButtonUp: MiddleMouseButtonUpPayload
    rightMouseButtonDown: RightMouseButtonDownPayload
    rightMouseButtonUp: RightMouseButtonUpPayload
  }>()

  onMount(() =>
    mountMouseButtonsListener({
      onLeftMouseButtonDown: payload => dispatch('leftMouseButtonDown', payload),
      onLeftMouseButtonUp: payload => dispatch('leftMouseButtonUp', payload),
      onMiddleMouseButtonDown: payload => dispatch('middleMouseButtonDown', payload),
      onMiddleMouseButtonUp: payload => dispatch('middleMouseButtonUp', payload),
      onRightMouseButtonDown: payload => dispatch('rightMouseButtonDown', payload),
      onRightMouseButtonUp: payload => dispatch('rightMouseButtonUp', payload),
    }),
  )
</script>
