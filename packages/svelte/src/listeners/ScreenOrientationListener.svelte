<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountScreenOrientationListener } from '@manapotion/core'

  import type { ScreenOrientationChangePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{
    screenOrientationChange: ScreenOrientationChangePayload
  }>()

  onMount(() =>
    mountScreenOrientationListener({
      onScreenOrientationChange: payload => dispatch('screenOrientationChange', payload),
    }),
  )
</script>
