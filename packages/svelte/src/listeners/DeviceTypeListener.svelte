<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { DeviceTypeChangePayload, mountDeviceTypeListener } from '@manapotion/core'

  const dispatch = createEventDispatcher<{
    deviceTypeChange: DeviceTypeChangePayload
  }>()

  onMount(() =>
    mountDeviceTypeListener({
      onDeviceTypeChange: payload => dispatch('deviceTypeChange', payload),
    }),
  )
</script>
