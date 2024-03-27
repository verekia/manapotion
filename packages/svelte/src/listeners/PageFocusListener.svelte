<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountBlurListener, mountFocusListener, PageFocusChangePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ pageFocusChange: PageFocusChangePayload }>()

  export const clearInputsOnBlur = false

  onMount(() => {
    let unsubBlur = mountBlurListener({
      onPageFocusChange: payload => dispatch('pageFocusChange', payload),
      clearInputsOnBlur,
    })
    const unsubFocus = mountFocusListener({
      onPageFocusChange: payload => dispatch('pageFocusChange', payload),
    })

    // TODO: handle updating the listener when the prop changes
    // watch(
    //   () => props.clearInputsOnBlur,
    //   newClearInputsOnBlur => {
    //     unsubBlur()
    //     unsubBlur = mountBlurListener({
    //       onPageFocusChange: payload => emit('pageFocusChange', payload),
    //       clearInputsOnBlur: newClearInputsOnBlur,
    //     })
    //   },
    // )

    return () => {
      unsubBlur()
      unsubFocus()
    }
  })
</script>
