import { defineComponent, onMounted, onUnmounted } from 'vue'

import { DeviceTypeListenerProps, mountDeviceTypeListener } from '@manapotion/core'

export const DeviceTypeListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountDeviceTypeListener({
        onUpdate: ({ isDesktop, isMobile }) => emit('update', { isDesktop, isMobile }),
      } satisfies DeviceTypeListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
