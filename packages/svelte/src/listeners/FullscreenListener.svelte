<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountFullscreenListener } from '@manapotion/core'

  import type { FullscreenChangePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ fullscreenChange: FullscreenChangePayload }>()

  onMount(() =>
    mountFullscreenListener({
      onFullscreenChange: payload => dispatch('fullscreenChange', payload),
    }),
  )
</script>
