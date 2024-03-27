<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountMouseMoveListener } from '@manapotion/core'

  import type { MouseMovePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ mouseMove: MouseMovePayload }>()

  export let mouseMovementResetDelay = 30

  onMount(() =>
    mountMouseMoveListener({
      onMouseMove: payload => dispatch('mouseMove', payload),
      // TODO: dynamically set this value
      mouseMovementResetDelay,
    }),
  )
</script>
