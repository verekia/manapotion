import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountDeviceTypeListener } from '@manapotion/core'

export const DeviceTypeListener = defineComponent({
  emits: ['deviceTypeChange'],
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
