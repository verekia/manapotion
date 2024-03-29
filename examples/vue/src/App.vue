<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  DeviceTypeChangePayload,
  DeviceTypeListener,
  FullscreenChangePayload,
  isDesktop,
  isLandscape,
  isMiddleMouseDown,
  isMobile,
  isPageFocused,
  isPageVisible,
  isPortrait,
  isRightMouseDown,
  keys,
  Listeners,
  mp,
  mpRefs,
  PageVisibilityPayload,
  PointerLockChangePayload,
  useAnimationFrame,
} from '@manapotion/vue'

import FullscreenButton from './FullscreenButton.vue'
import PointerLockButton from './PointerLockButton.vue'

const handleFullscreenChange = ({ isFullscreen }: FullscreenChangePayload) => {
  console.log('Fullscreen change!', isFullscreen)
}

const handlePointerLockChange = ({ isPointerLocked }: PointerLockChangePayload) => {
  console.log('Pointer lock change!', isPointerLocked)
}

const mouseXRef = ref<HTMLSpanElement | null>(null)
const mouseYRef = ref<HTMLSpanElement | null>(null)
const mouseMovementXRef = ref<HTMLSpanElement | null>(null)
const mouseMovementYRef = ref<HTMLSpanElement | null>(null)
const windowWidthRef = ref<HTMLSpanElement | null>(null)
const windowHeightRef = ref<HTMLSpanElement | null>(null)
const mouseScrollRef = ref<HTMLSpanElement | null>(null)

useAnimationFrame(() => {
  const {
    mouseX,
    mouseY,
    mouseMovementX,
    mouseMovementY,
    windowWidth,
    windowHeight,
    mouseWheelDeltaY,
  } = mp()

  mouseXRef.value!.textContent = String(mouseX)
  mouseYRef.value!.textContent = String(mouseY)
  mouseMovementXRef.value!.textContent = String(mouseMovementX)
  mouseMovementYRef.value!.textContent = String(mouseMovementY)
  windowWidthRef.value!.textContent = String(windowWidth)
  windowHeightRef.value!.textContent = String(windowHeight)
  mouseScrollRef.value!.textContent = String(mouseWheelDeltaY)
})

const handlePageVisibilityChange = ({ isVisible }: PageVisibilityPayload) => {
  console.log('Page visibility change!', isVisible)
}

const handleDT = (payload: DeviceTypeChangePayload) => {
  console.log(payload)
}

const jsonKeys = computed(() => JSON.stringify(keys.value))
</script>

<template>
  <FullscreenButton />
  <PointerLockButton />
  <div>Mouse position: <span ref="mouseXRef" /> <span ref="mouseYRef" /></div>
  <div>Mouse movement: <span ref="mouseMovementXRef" /> <span ref="mouseMovementYRef" /></div>
  <div>Mouse scroll: <span ref="mouseScrollRef" /></div>
  <div>Is page visible: {{ isPageVisible }}</div>
  <div>Is page focused: {{ isPageFocused }}</div>
  <div>Is mobile: {{ isMobile }}</div>
  <div>Is desktop: {{ isDesktop }}</div>
  <div>Is portrait: {{ isPortrait }}</div>
  <div>Is landscape: {{ isLandscape }}</div>
  <div>Window size: <span ref="windowWidthRef" /> <span ref="windowHeightRef" /></div>
  <div>
    Mouse buttons: Left: {{ mpRefs.isLeftMouseDown }}, Middle: {{ isMiddleMouseDown }}, Right:
    {{ isRightMouseDown }}
  </div>
  <div>
    <div>
      <b>Keyboard</b>
    </div>
    <textarea readonly class="h-[100px] w-full max-w-[500px]" :value="jsonKeys" />
  </div>

  <Listeners
    @fullscreenChange="handleFullscreenChange"
    @pointerLockChange="handlePointerLockChange"
    @pageVisibilityChange="handlePageVisibilityChange"
    @deviceTypeChange="handleDT"
  />
  <DeviceTypeListener @deviceTypeChange="handleDT" />
</template>
