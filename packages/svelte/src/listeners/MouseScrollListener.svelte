<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountMouseScrollListener } from '@manapotion/core'

  import type { MouseScrollPayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ scroll: MouseScrollPayload }>()

  export let mouseScrollResetDelay: number

  onMount(() =>
    mountMouseScrollListener({
      onScroll: payload => dispatch('scroll', payload),
      // TODO: dynamically set this value
      mouseScrollResetDelay,
    }),
  )
</script>
