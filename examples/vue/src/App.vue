<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  isDesktop,
  isLandscape,
  isLeftMouseDown,
  isMiddleMouseDown,
  isMobile,
  isPageFocused,
  isPageVisible,
  isPortrait,
  isRightMouseDown,
  keys,
  Listeners,
  mp,
  useAnimationFrame,
} from '@manapotion/vue'

import FullscreenButton from './FullscreenButton.vue'
import PointerLockButton from './PointerLockButton.vue'

const handleFullscreenChange = (event: Event) => {
  console.log('Fullscreen change!', event)
}

const handlePointerLockChange = (isPointerLocked: boolean) => {
  console.log('Pointer lock change!', isPointerLocked)
}

const mouseXRef = ref<HTMLSpanElement | null>(null)
const mouseYRef = ref<HTMLSpanElement | null>(null)
const mouseMovementXRef = ref<HTMLSpanElement | null>(null)
const mouseMovementYRef = ref<HTMLSpanElement | null>(null)
const windowWidthRef = ref<HTMLSpanElement | null>(null)
const windowHeightRef = ref<HTMLSpanElement | null>(null)

useAnimationFrame(() => {
  const { mouseX, mouseY, mouseMovementX, mouseMovementY, windowWidth, windowHeight } = mp()

  mouseXRef.value!.textContent = String(mouseX)
  mouseYRef.value!.textContent = String(mouseY)
  mouseMovementXRef.value!.textContent = String(mouseMovementX)
  mouseMovementYRef.value!.textContent = String(mouseMovementY)
  windowWidthRef.value!.textContent = String(windowWidth)
  windowHeightRef.value!.textContent = String(windowHeight)
})

const handlePageVisibilityChange = (isVisible: boolean) => {
  console.log('Page visibility change!', isVisible)
}

const jsonKeys = computed(() => JSON.stringify(keys.value))
</script>

<template>
  <FullscreenButton />
  <PointerLockButton />
  <div>Mouse position: <span ref="mouseXRef"></span> <span ref="mouseYRef"></span></div>
  <div>
    Mouse movement: <span ref="mouseMovementXRef"></span> <span ref="mouseMovementYRef"></span>
  </div>
  <div>Is page visible: {{ isPageVisible }}</div>
  <div>Is page focused: {{ isPageFocused }}</div>
  <div>Is mobile: {{ isMobile }}</div>
  <div>Is desktop: {{ isDesktop }}</div>
  <div>Is portrait: {{ isPortrait }}</div>
  <div>Is landscape: {{ isLandscape }}</div>
  <div>Window size: <span ref="windowWidthRef"></span> <span ref="windowHeightRef"></span></div>
  <div>
    Mouse buttons: Left: {{ isLeftMouseDown }}, Middle: {{ isMiddleMouseDown }}, Right:
    {{ isRightMouseDown }}
  </div>
  <div>
    <div>
      <b>Keyboard</b>
    </div>
    <textarea readonly class="h-[100px] w-full max-w-[500px]" :value="jsonKeys" />
  </div>

  <Listeners
    @fullscreenchange="handleFullscreenChange"
    @pointerlockchange="handlePointerLockChange"
    @visibilitychange="handlePageVisibilityChange"
  />
</template>
