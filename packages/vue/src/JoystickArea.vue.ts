import { defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue'

import { Joystick, mountJoystickArea } from '@manapotion/core'

export const JoystickArea = defineComponent({
  name: 'JoystickArea',
  props: {
    mode: {
      type: String as () => 'follow' | 'origin',
      default: 'follow',
    },
    joystick: {
      type: Object as () => Joystick,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    maxFollowDistance: { type: Number },
    // eslint-disable-next-line vue/require-default-prop
    maxOriginDistance: { type: Number },
    // eslint-disable-next-line vue/require-default-prop
    onEnd: { type: Function },
    // eslint-disable-next-line vue/require-default-prop
    onMove: { type: Function },
    // eslint-disable-next-line vue/require-default-prop
    onStart: { type: Function },
    // eslint-disable-next-line vue/require-default-prop
    containerProps: { type: Object },
  },
  setup(props, { slots, attrs }) {
    const localRef = ref<HTMLDivElement | null>(null)

    onMounted(() => {
      let unsub = mountJoystickArea({
        mode: props.mode,
        joystick: props.joystick,
        maxFollowDistance: props.maxFollowDistance,
        maxOriginDistance: props.maxOriginDistance,
        onEnd: props.onEnd as (joystick: Joystick) => void,
        onMove: props.onMove as (joystick: Joystick) => void,
        onStart: props.onStart as (joystick: Joystick) => void,
        element: localRef.value!,
      })
      // TODO: watch for changes in other props? joystick, maxFollowDistance, maxOriginDistance
      watch(
        () => props.mode,
        newMode => {
          unsub()
          unsub = mountJoystickArea({
            mode: newMode,
            joystick: props.joystick,
            maxFollowDistance: props.maxFollowDistance,
            maxOriginDistance: props.maxOriginDistance,
            onEnd: props.onEnd as (joystick: Joystick) => void,
            onMove: props.onMove as (joystick: Joystick) => void,
            onStart: props.onStart as (joystick: Joystick) => void,
            element: localRef.value!,
          })
        },
      )
      onUnmounted(() => {
        unsub()
      })
    })

    return () =>
      h(
        'div',
        {
          ...props.containerProps,
          ref: localRef,
          ...attrs,
        },
        slots.default ? slots.default() : [],
      )
  },
})
