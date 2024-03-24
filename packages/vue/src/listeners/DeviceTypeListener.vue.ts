import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountDeviceTypeListener } from '@manapotion/core'

export const DeviceTypeListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountDeviceTypeListener({
        onUpdate: ({ isDesktop, isMobile }: { isDesktop: boolean; isMobile: boolean }) =>
          emit('update', { isDesktop, isMobile }),
      })
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
