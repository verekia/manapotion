<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountMouseMoveListener, MouseMovePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ mouseMove: MouseMovePayload }>()

  export const mouseMovementResetDelay = 30

  onMount(() =>
    mountMouseMoveListener({
      onMouseMove: payload => dispatch('mouseMove', payload),
      // TODO: dynamically set this value
      mouseMovementResetDelay,
    }),
  )
</script>
