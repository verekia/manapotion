<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  browser,
  DeviceTypeChangePayload,
  DeviceTypeListener,
  FullscreenChangePayload,
  getBrowser,
  getMouse,
  keyboard,
  Listeners,
  mouse,
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
  const mouse = getMouse()
  const browser = getBrowser()

  mouseXRef.value!.textContent = String(mouse.position.x)
  mouseYRef.value!.textContent = String(mouse.position.y)
  mouseMovementXRef.value!.textContent = String(mouse.movement.x)
  mouseMovementYRef.value!.textContent = String(mouse.movement.y)
  windowWidthRef.value!.textContent = String(browser.width)
  windowHeightRef.value!.textContent = String(browser.height)
  mouseScrollRef.value!.textContent = String(mouse.wheel.y)
})

const handlePageVisibilityChange = ({ isPageVisible }: PageVisibilityPayload) => {
  console.log('Page visibility change!', isPageVisible)
}

const handleDT = (payload: DeviceTypeChangePayload) => {
  console.log(payload)
}

const jsonKeys = computed(() => JSON.stringify(keyboard))
</script>

<template>
  <FullscreenButton />
  <PointerLockButton />
  <div>Mouse position: <span ref="mouseXRef" /> <span ref="mouseYRef" /></div>
  <div>Mouse movement: <span ref="mouseMovementXRef" /> <span ref="mouseMovementYRef" /></div>
  <div>Mouse scroll: <span ref="mouseScrollRef" /></div>
  <div>Is page visible: {{ browser.isPageVisible }}</div>
  <div>Is page focused: {{ browser.isPageFocused }}</div>
  <div>Is mobile: {{ browser.isMobile }}</div>
  <div>Is desktop: {{ browser.isDesktop }}</div>
  <div>Is portrait: {{ browser.isPortrait }}</div>
  <div>Is landscape: {{ browser.isLandscape }}</div>
  <div>Window size: <span ref="windowWidthRef" /> <span ref="windowHeightRef" /></div>
  <div>
    Mouse buttons: Left: {{ mouse.buttons.left }}, Middle: {{ mouse.buttons.middle }}, Right:
    {{ mouse.buttons.right }}
  </div>
  <div>
    <div>
      <b>Keyboard</b>
    </div>
    <textarea readonly class="h-[100px] w-full max-w-[500px]" :value="jsonKeys" />
  </div>

  <Listeners
    @fullscreen-change="handleFullscreenChange"
    @pointer-lock-change="handlePointerLockChange"
    @page-visibility-change="handlePageVisibilityChange"
    @device-type-change="handleDT"
  />
  <DeviceTypeListener @device-type-change="handleDT" />
</template>
