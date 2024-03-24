import { defineComponent, onMounted, onUnmounted } from 'vue'

import { mountScreenOrientationListener, ScreenOrientationListenerProps } from '@manapotion/core'

export const ScreenOrientationListener = defineComponent({
  emits: ['screen-orientation-change'],
  setup(_, { emit }) {
    let unsub = () => {}

    onMounted(() => {
      unsub = mountScreenOrientationListener({
        onScreenOrientationChange: ({ isPortrait, isLandscape }) =>
          emit('screen-orientation-change', { isPortrait, isLandscape }),
      } satisfies ScreenOrientationListenerProps)
    })

    onUnmounted(unsub)
  },
  render() {
    return null
  },
})
