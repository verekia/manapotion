<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountBlurListener, mountFocusListener } from '@manapotion/core'

  import type { PageFocusChangePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ pageFocusChange: PageFocusChangePayload }>()

  onMount(() => {
    let unsubBlur = mountBlurListener({
      onPageFocusChange: payload => dispatch('pageFocusChange', payload),
    })
    const unsubFocus = mountFocusListener({
      onPageFocusChange: payload => dispatch('pageFocusChange', payload),
    })

    return () => {
      unsubBlur()
      unsubFocus()
    }
  })
</script>
