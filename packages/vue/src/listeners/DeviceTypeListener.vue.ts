import { defineComponent, onMounted, onUnmounted } from 'vue'

import { DeviceTypeListenerProps, mountDeviceTypeListener } from '@manapotion/core'

export const DeviceTypeListener = defineComponent({
  emits: ['deviceTypeChange'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountDeviceTypeListener({
        onDeviceTypeChange: ({ isDesktop, isMobile }) =>
          emit('deviceTypeChange', { isDesktop, isMobile }),
      } satisfies DeviceTypeListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
