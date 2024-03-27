<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountScreenOrientationListener, ScreenOrientationChangePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{
    screenOrientationChange: ScreenOrientationChangePayload
  }>()

  onMount(() =>
    mountScreenOrientationListener({
      onScreenOrientationChange: payload => dispatch('screenOrientationChange', payload),
    }),
  )
</script>
