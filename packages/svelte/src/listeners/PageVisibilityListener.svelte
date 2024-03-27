<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountPageVisibilityListener, PageVisibilityPayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ pageVisibilityChange: PageVisibilityPayload }>()

  onMount(() =>
    mountPageVisibilityListener({
      onPageVisibilityChange: payload => dispatch('pageVisibilityChange', payload),
    }),
  )
</script>
