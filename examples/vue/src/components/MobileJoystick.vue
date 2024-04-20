<script setup lang="ts">
import { ref } from 'vue'

import { getJoysticks, JoystickArea } from '@manapotion/vue'

import type { Joystick } from '@manapotion/vue'

const props = defineProps<{ mode: 'follow' | 'origin' }>()

const joystickCurrent = ref<HTMLDivElement | null>(null)
const joystickOrigin = ref<HTMLDivElement | null>(null)
const joystickFollow = ref<HTMLDivElement | null>(null)

const handleStart = (joystick: Joystick) => {
  joystickCurrent.value!.style.transform = `translate(${joystick.current.x}px, ${-joystick.current.y!}px)`
  joystickOrigin.value!.style.transform = `translate(${joystick.origin.x}px, ${-joystick.origin.y!}px)`
  joystickFollow.value!.style.transform = `translate(${joystick.follow.x}px, ${-joystick.follow.y!}px)`
  joystickCurrent.value!.style.opacity = '1'
  props.mode === 'follow' && (joystickFollow.value!.style.opacity = '1')
  joystickOrigin.value!.style.opacity = '1'
}

const handleEnd = () => {
  joystickCurrent.value!.style.opacity = '0'
  joystickFollow.value!.style.opacity = '0'
  joystickOrigin.value!.style.opacity = '0'
}

const handleMove = (joystick: Joystick) => {
  joystickCurrent.value!.style.transform = `translate(${joystick.current.x}px, ${-joystick.current.y!}px)`
  joystickOrigin.value!.style.transform = `translate(${joystick.origin.x}px, ${-joystick.origin.y!}px)`
  joystickFollow.value!.style.transform = `translate(${joystick.follow.x}px, ${-joystick.follow.y!}px)`
}
</script>

<template>
  <JoystickArea
    :joystick="getJoysticks().movement"
    :mode="props.mode"
    :container-props="{ class: `relative z-10 h-48 w-64 rounded-md border border-slate-500 ` }"
    @start="handleStart"
    @move="handleMove"
    @end="handleEnd"
  >
    <div
      ref="joystickCurrent"
      class="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-red-500 opacity-0 transition-opacity"
    />
    <div
      ref="joystickOrigin"
      class="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-blue-500 opacity-0 transition-opacity"
    />
    <div
      ref="joystickFollow"
      class="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-green-500 opacity-0 transition-opacity"
    />
  </JoystickArea>
</template>
