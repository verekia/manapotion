import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountScreenOrientationListener, ScreenOrientationListenerProps } from '@manapotion/core'

export const ScreenOrientationListener = defineComponent({
  emits: ['screenOrientationChange'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountScreenOrientationListener({
        onScreenOrientationChange: ({ isPortrait, isLandscape }) =>
          emit('screenOrientationChange', { isPortrait, isLandscape }),
      } satisfies ScreenOrientationListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
