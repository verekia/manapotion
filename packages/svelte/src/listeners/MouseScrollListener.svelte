<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountMouseScrollListener, MouseScrollPayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ scroll: MouseScrollPayload }>()

  export const mouseScrollResetDelay = 100

  onMount(() =>
    mountMouseScrollListener({
      onScroll: payload => dispatch('scroll', payload),
      // TODO: dynamically set this value
      mouseScrollResetDelay,
    }),
  )
</script>
