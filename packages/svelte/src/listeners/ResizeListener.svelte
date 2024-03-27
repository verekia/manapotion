<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountResizeListener, ResizePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ resize: ResizePayload }>()

  onMount(() => mountResizeListener({ onResize: payload => dispatch('resize', payload) }))
</script>
