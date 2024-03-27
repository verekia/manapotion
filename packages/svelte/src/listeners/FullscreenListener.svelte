<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { FullscreenChangePayload, mountFullscreenListener } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ fullscreenChange: FullscreenChangePayload }>()

  onMount(() =>
    mountFullscreenListener({
      onFullscreenChange: payload => dispatch('fullscreenChange', payload),
    }),
  )
</script>
