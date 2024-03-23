import { defineComponent, h, onMounted, onUnmounted } from 'vue'

import { mp } from '@manapotion/store'

export const FullscreenChangeListener = defineComponent({
  emits: ['fullscreenchange'],
  setup(_, { emit }) {
    const handleFullscreenChange = () => {
      const isFullscreen = Boolean(document.fullscreenElement)
      mp().setFullscreen(isFullscreen)
      emit('fullscreenchange', isFullscreen)
    }

    onMounted(() => document.addEventListener('fullscreenchange', handleFullscreenChange))
    onUnmounted(() => document.removeEventListener('fullscreenchange', handleFullscreenChange))
  },
  render() {
    return null
  },
})

export const PointerLockListener = defineComponent({
  emits: ['pointerlockchange'],
  setup(_, { emit }) {
    const handlePointerLockChange = () => {
      const isPointerLocked = Boolean(document.pointerLockElement)
      mp().setPointerLocked(isPointerLocked)
      emit('pointerlockchange', isPointerLocked)
    }

    onMounted(() => document.addEventListener('pointerlockchange', handlePointerLockChange))
    onUnmounted(() => document.removeEventListener('pointerlockchange', handlePointerLockChange))
  },
  render() {
    return null
  },
})

export const Listeners = defineComponent({
  emits: ['fullscreenchange', 'pointerlockchange'],
  setup(_, { emit }) {
    return () => [
      h(FullscreenChangeListener, {
        onFullscreenchange: (isFullscreen: boolean) => emit('fullscreenchange', isFullscreen),
      }),
      h(PointerLockListener, {
        onPointerlockchange: (isPointerLocked: boolean) =>
          emit('pointerlockchange', isPointerLocked),
      }),
    ]
  },
})
