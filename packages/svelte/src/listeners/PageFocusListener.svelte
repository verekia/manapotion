<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountPageFocusListener } from '@manapotion/core'

  import type { PageFocusChangePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ pageFocusChange: PageFocusChangePayload }>()

  onMount(() =>
    mountPageFocusListener({
      onPageFocusChange: payload => dispatch('pageFocusChange', payload),
    }),
  )
</script>
