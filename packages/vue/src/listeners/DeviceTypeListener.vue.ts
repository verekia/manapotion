import { defineComponent, onMounted, onUnmounted } from 'vue'

import { DeviceTypeListenerProps, mountDeviceTypeListener } from '@manapotion/core'

export const DeviceTypeListener = defineComponent({
  emits: ['device-type-change'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountDeviceTypeListener({
        onDeviceTypeChange: ({ isDesktop, isMobile }) =>
          emit('device-type-change', { isDesktop, isMobile }),
      } satisfies DeviceTypeListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
