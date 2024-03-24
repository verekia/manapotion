import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountScreenOrientationListener } from '@manapotion/core'

export const ScreenOrientationListener = defineComponent({
  emits: ['update'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountScreenOrientationListener({
        onUpdate: ({ isPortrait, isLandscape }: { isPortrait: boolean; isLandscape: boolean }) =>
          emit('update', { isPortrait, isLandscape }),
      })
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
