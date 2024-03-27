<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountDeviceTypeListener } from '@manapotion/core'

  const dispatch = createEventDispatcher()

  onMount(() =>
    mountDeviceTypeListener({
      onDeviceTypeChange: ({ isDesktop, isMobile }) =>
        dispatch('deviceTypeChange', { isDesktop, isMobile }),
    }),
  )
</script>
