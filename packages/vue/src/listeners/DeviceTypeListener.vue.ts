import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountDeviceTypeListener } from '@manapotion/core'

import type { DeviceTypeChangePayload } from '@manapotion/core'

export const DeviceTypeListener = defineComponent({
  emits: { deviceTypeChange: (payload: DeviceTypeChangePayload) => payload },
  setup: (_, { emit }) => {
    onMounted(() => {
      const unsub = mountDeviceTypeListener({
        onDeviceTypeChange: payload => emit('deviceTypeChange', payload),
      })
      onUnmounted(unsub)
    })
  },
  render: () => null,
})
