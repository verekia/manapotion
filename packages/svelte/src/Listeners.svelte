<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import type {
    DeviceTypeChangePayload,
    FullscreenChangePayload,
    KeyDownPayload,
    KeyUpPayload,
    LeftMouseDownPayload,
    LeftMouseUpPayload,
    MiddleMouseDownPayload,
    MiddleMouseUpPayload,
    MouseMovePayload,
    MouseScrollPayload,
    PageFocusChangePayload,
    PageVisibilityPayload,
    PointerLockChangePayload,
    ResizePayload,
    RightMouseDownPayload,
    RightMouseUpPayload,
    ScreenOrientationChangePayload,
  } from '@manapotion/core'

  import DeviceTypeListener from './listeners/DeviceTypeListener.svelte'
  import FullscreenListener from './listeners/FullscreenListener.svelte'
  import KeyboardListener from './listeners/KeyboardListener.svelte'
  import MouseButtonsListener from './listeners/MouseButtonsListener.svelte'
  import MouseMoveListener from './listeners/MouseMoveListener.svelte'
  import MouseScrollListener from './listeners/MouseScrollListener.svelte'
  import PageFocusListener from './listeners/PageFocusListener.svelte'
  import PageVisibilityListener from './listeners/PageVisibilityListener.svelte'
  import PointerLockListener from './listeners/PointerLockListener.svelte'
  import ResizeListener from './listeners/ResizeListener.svelte'
  import ScreenOrientationListener from './listeners/ScreenOrientationListener.svelte'

  const dispatch = createEventDispatcher<{
    deviceTypeChange: DeviceTypeChangePayload
    fullscreenChange: FullscreenChangePayload
    keyDown: KeyDownPayload
    keyUp: KeyUpPayload
    leftMouseDown: LeftMouseDownPayload
    leftMouseUp: LeftMouseUpPayload
    middleMouseDown: MiddleMouseDownPayload
    middleMouseUp: MiddleMouseUpPayload
    rightMouseDown: RightMouseDownPayload
    rightMouseUp: RightMouseUpPayload
    mouseMove: MouseMovePayload
    scroll: MouseScrollPayload
    pageFocusChange: PageFocusChangePayload
    pageVisibilityChange: PageVisibilityPayload
    pointerLockChange: PointerLockChangePayload
    resize: ResizePayload
    screenOrientationChange: ScreenOrientationChangePayload
  }>()

  export let mouseScrollResetDelay = 100
  export let mouseMovementResetDelay = 30
  export let clearInputsOnBlur = true
</script>

<DeviceTypeListener on:deviceTypeChange={e => dispatch('deviceTypeChange', e.detail)} />
<FullscreenListener on:fullscreenChange={e => dispatch('fullscreenChange', e.detail)} />
<KeyboardListener
  on:keyDown={e => dispatch('keyDown', e.detail)}
  on:keyUp={e => dispatch('keyUp', e.detail)}
/>
<MouseButtonsListener
  on:leftMouseDown={e => dispatch('leftMouseDown', e.detail)}
  on:leftMouseUp={e => dispatch('leftMouseUp', e.detail)}
  on:middleMouseDown={e => dispatch('middleMouseDown', e.detail)}
  on:middleMouseUp={e => dispatch('middleMouseUp', e.detail)}
  on:rightMouseDown={e => dispatch('rightMouseDown', e.detail)}
  on:rightMouseUp={e => dispatch('rightMouseUp', e.detail)}
/>
<MouseMoveListener on:mouseMove={e => dispatch('mouseMove', e.detail)} {mouseMovementResetDelay} />
<MouseScrollListener on:scroll={e => dispatch('scroll', e.detail)} {mouseScrollResetDelay} />
<PageFocusListener
  on:pageFocusChange={e => dispatch('pageFocusChange', e.detail)}
  {clearInputsOnBlur}
/>
<PageVisibilityListener on:pageVisibilityChange={e => dispatch('pageVisibilityChange', e.detail)} />
<PointerLockListener on:pointerLockChange={e => dispatch('pointerLockChange', e.detail)} />
<ResizeListener on:resize={e => dispatch('resize', e.detail)} />
<ScreenOrientationListener
  on:screenOrientationChange={e => dispatch('screenOrientationChange', e.detail)}
/>
