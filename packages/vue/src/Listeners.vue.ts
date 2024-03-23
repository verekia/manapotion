import { defineComponent, h, onMounted, onUnmounted, ref } from 'vue'

import { handleMouseMove, mouseMoveCleanup, mp } from '@manapotion/core'

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

export const MouseMoveListener = defineComponent({
  emits: ['mousemove'],
  props: {
    mouseMoveResetDelay: {
      type: Number,
      default: 30,
    },
  },
  setup(props, { emit }) {
    const mouseMovementResetTimeoutRef = ref<number | undefined>()

    const highOrderHandleMouseMove = handleMouseMove({
      onMouseMove: (...args: any[]) => emit('mousemove', ...args),
      mouseMoveResetDelay: props.mouseMoveResetDelay,
      mouseMoveResetTimeout: mouseMovementResetTimeoutRef.value,
    })

    onMounted(() => {
      document.addEventListener('mousemove', highOrderHandleMouseMove)
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', highOrderHandleMouseMove)
      mouseMoveCleanup(mouseMovementResetTimeoutRef.value)
    })
  },
  render() {
    return null
  },
})

export const Listeners = defineComponent({
  emits: ['fullscreenchange', 'pointerlockchange', 'mousemove'],
  setup(_, { emit }) {
    return () => [
      h(FullscreenChangeListener, {
        onFullscreenchange: (isFullscreen: boolean) => emit('fullscreenchange', isFullscreen),
      }),
      h(PointerLockListener, {
        onPointerlockchange: (isPointerLocked: boolean) =>
          emit('pointerlockchange', isPointerLocked),
      }),
      h(MouseMoveListener, {
        onMousemove: (...args: any[]) => emit('mousemove', ...args),
      }),
    ]
  },
})
