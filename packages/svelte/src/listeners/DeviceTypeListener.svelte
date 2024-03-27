<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { mountDeviceTypeListener } from '@manapotion/core'

  import type { DeviceTypeChangePayload } from '@manapotion/core'

  const dispatch = createEventDispatcher<{ deviceTypeChange: DeviceTypeChangePayload }>()

  onMount(() =>
    mountDeviceTypeListener({
      onDeviceTypeChange: payload => dispatch('deviceTypeChange', payload),
    }),
  )
</script>
