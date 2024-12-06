import {
  addMainLoopEffect,
  enterFullscreen,
  exitFullscreen,
  getBrowser,
  getJoysticks,
  getKeyboard,
  getMouse,
  listeners,
  lockKeys,
  lockOrientation,
  lockPointer,
  mountJoystickArea,
  pauseMainLoop,
  resumeMainLoop,
  unlockKeys,
  unlockOrientation,
  unlockPointer,
} from '@manapotion/vanilla'

import type {
  DeviceTypeChangePayload,
  FullscreenChangePayload,
  Joystick,
  LeftMouseButtonDownPayload,
  LeftMouseButtonUpPayload,
  MiddleMouseButtonDownPayload,
  MiddleMouseButtonUpPayload,
  MouseMovePayload,
  MouseScrollPayload,
  PageFocusChangePayload,
  PageVisibilityPayload,
  PointerLockChangePayload,
  ResizePayload,
  RightMouseButtonDownPayload,
  RightMouseButtonUpPayload,
  ScreenOrientationChangePayload,
} from '@manapotion/vanilla'

import { DiscordIcon, GitHubIcon, TwitterIcon } from './components/icons'
import Item from './components/Item'
import html from './html'

const getLabelValue = (value: boolean) =>
  value === true ? 'Yes' : value === false ? 'No' : 'Unknown'

const getLabelClass = (value: boolean) =>
  `label ${value === true ? 'label--positive' : value === false ? 'label--negative' : 'label--unknown'}`

const updateKeyboard = () => {
  const { codes, keys, alt, ctrl, meta, shift } = getKeyboard()

  const codesContent = Array.from(Object.keys(codes)).reduce(
    (acc, code) => `${acc}${acc && ','} ${code}`,
    '',
  )

  const keysContent = Array.from(Object.keys(keys)).reduce(
    (acc, key) => `${acc}${acc && ','} ${key}`,
    '',
  )

  const elCodes = document.getElementById('codes')!
  elCodes.textContent = codesContent

  const elKeys = document.getElementById('keys')!
  elKeys.textContent = keysContent

  const elCtrl = document.getElementById('ctrl')!
  elCtrl.textContent = getLabelValue(ctrl)
  elCtrl.className = getLabelClass(ctrl)

  const elShift = document.getElementById('shift')!
  elShift.textContent = getLabelValue(shift)
  elShift.className = getLabelClass(shift)

  const elAlt = document.getElementById('alt')!
  elAlt.textContent = getLabelValue(alt)
  elAlt.className = getLabelClass(alt)

  const elMeta = document.getElementById('meta')!
  elMeta.textContent = getLabelValue(meta)
  elMeta.className = getLabelClass(meta)
}

let joystickMode: 'follow' | 'origin' = 'follow'
let unsubJoystickArea: () => void

const updateJoystickButton = () => {
  const btn = document.getElementById('joystick-mode-btn')!
  btn.textContent = joystickMode === 'follow' ? 'Follow' : 'Origin'
}

const handleJoystickStart = (joystick: Joystick) => {
  const joystickCurrentEl = document.getElementById('joystick-current')!
  const joystickOriginEl = document.getElementById('joystick-origin')!
  const joystickFollowEl = document.getElementById('joystick-follow')!
  joystickCurrentEl.style.transform = `translate(${joystick.current.x}px, ${-joystick.current.y!}px)`
  joystickOriginEl.style.transform = `translate(${joystick.origin.x}px, ${-joystick.origin.y!}px)`
  joystickFollowEl.style.transform = `translate(${joystick.follow.x}px, ${-joystick.follow.y!}px)`
  joystickCurrentEl.style.opacity = '1'
  joystickMode === 'follow' && (joystickFollowEl.style.opacity = '1')
  joystickOriginEl.style.opacity = '1'
}

const handleJoystickEnd = () => {
  const joystickCurrentEl = document.getElementById('joystick-current')!
  const joystickOriginEl = document.getElementById('joystick-origin')!
  const joystickFollowEl = document.getElementById('joystick-follow')!
  joystickCurrentEl.style.opacity = '0'
  joystickOriginEl.style.opacity = '0'
  joystickFollowEl.style.opacity = '0'
}

const handleJoystickMove = (joystick: Joystick) => {
  const joystickCurrentEl = document.getElementById('joystick-current')!
  const joystickOriginEl = document.getElementById('joystick-origin')!
  const joystickFollowEl = document.getElementById('joystick-follow')!
  joystickCurrentEl.style.transform = `translate(${joystick.current.x}px, ${-joystick.current.y!}px)`
  joystickOriginEl.style.transform = `translate(${joystick.origin.x}px, ${-joystick.origin.y!}px)`
  joystickFollowEl.style.transform = `translate(${joystick.follow.x}px, ${-joystick.follow.y!}px)`
}

document.addEventListener('DOMContentLoaded', () => {
  updateKeyboard()

  const mouseLeft = document.getElementById('mouse-left')!
  mouseLeft.textContent = getLabelValue(false)
  mouseLeft.className = getLabelClass(false)

  const mouseMiddle = document.getElementById('mouse-middle')!
  mouseMiddle.textContent = getLabelValue(false)
  mouseMiddle.className = getLabelClass(false)

  const mouseRight = document.getElementById('mouse-right')!
  mouseRight.textContent = getLabelValue(false)
  mouseRight.className = getLabelClass(false)

  listeners({
    onFullscreenChange: ({ isFullscreen }: FullscreenChangePayload) => {
      const el = document.getElementById('isFullscreen')!
      const btn = document.getElementById('fullscreenButton')!
      el.textContent = getLabelValue(isFullscreen)
      el.className = getLabelClass(isFullscreen)
      btn.textContent = isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
    },
    onPageVisibilityChange: ({ isPageVisible }: PageVisibilityPayload) => {
      const el = document.getElementById('isPageVisible')!
      el.textContent = getLabelValue(isPageVisible)
      el.className = getLabelClass(isPageVisible)
      isPageVisible ? resumeMainLoop() : pauseMainLoop()
    },
    onPageFocusChange: ({ isPageFocused }: PageFocusChangePayload) => {
      const el = document.getElementById('isPageFocused')!
      el.textContent = getLabelValue(isPageFocused)
      el.className = getLabelClass(isPageFocused)
    },
    onDeviceTypeChange: ({ isDesktop, isMobile }: DeviceTypeChangePayload) => {
      const elDesktop = document.getElementById('isDesktop')!
      elDesktop.textContent = getLabelValue(isDesktop)
      elDesktop.className = getLabelClass(isDesktop)

      const elMobile = document.getElementById('isMobile')!
      elMobile.textContent = getLabelValue(isMobile)
      elMobile.className = getLabelClass(isMobile)
    },
    onScreenOrientationChange: ({ isPortrait, isLandscape }: ScreenOrientationChangePayload) => {
      const elPortrait = document.getElementById('isPortrait')!
      elPortrait.textContent = getLabelValue(isPortrait)
      elPortrait.className = getLabelClass(isPortrait)

      const elLandscape = document.getElementById('isLandscape')!
      elLandscape.textContent = getLabelValue(isLandscape)
      elLandscape.className = getLabelClass(isLandscape)
    },
    onResize: ({ width, height }: ResizePayload) => {
      const el = document.getElementById('windowSize')!
      el.textContent = `${width}x${height}`
    },
    onPointerLockChange: ({ isPointerLocked }: PointerLockChangePayload) => {
      const el = document.getElementById('isMouseLocked')!
      el.textContent = getLabelValue(isPointerLocked)
      el.className = getLabelClass(isPointerLocked)
      const btn = document.getElementById('mouseLockButton')!
      btn.textContent = isPointerLocked ? 'Unlock' : 'Lock'
    },
    onLeftMouseButtonDown: (_: LeftMouseButtonDownPayload) => {
      const el = document.getElementById('mouse-left')!
      el.textContent = getLabelValue(true)
      el.className = getLabelClass(true)
    },
    onMiddleMouseButtonDown: (_: MiddleMouseButtonDownPayload) => {
      const el = document.getElementById('mouse-middle')!
      el.textContent = getLabelValue(true)
      el.className = getLabelClass(true)
    },
    onRightMouseButtonDown: (_: RightMouseButtonDownPayload) => {
      const el = document.getElementById('mouse-right')!
      el.textContent = getLabelValue(true)
      el.className = getLabelClass(true)
    },
    onLeftMouseButtonUp: (_: LeftMouseButtonUpPayload) => {
      const el = document.getElementById('mouse-left')!
      el.textContent = getLabelValue(false)
      el.className = getLabelClass(false)
    },
    onMiddleMouseButtonUp: (_: MiddleMouseButtonUpPayload) => {
      const el = document.getElementById('mouse-middle')!
      el.textContent = getLabelValue(false)
      el.className = getLabelClass(false)
    },
    onRightMouseButtonUp: (_: RightMouseButtonUpPayload) => {
      const el = document.getElementById('mouse-right')!
      el.textContent = getLabelValue(false)
      el.className = getLabelClass(false)
    },
    onMouseMove: ({ position, movement }: MouseMovePayload) => {
      const elPos = document.getElementById('mouse-position')!
      elPos.textContent = `${position.x}, ${position.y}`

      const elMove = document.getElementById('mouse-movement')!
      elMove.textContent = `${movement.x}, ${movement.y}`
    },
    onScroll: ({ y }: MouseScrollPayload) => {
      const el = document.getElementById('mouse-scroll-y')!
      el.textContent = String(Math.round(y))
    },
    onKeyDown: updateKeyboard,
    onKeyUp: updateKeyboard,
  })

  unsubJoystickArea = mountJoystickArea({
    element: document.getElementById('joystick-area')!,
    mode: joystickMode,
    joystick: getJoysticks().movement,
    onMove: handleJoystickMove,
    onStart: handleJoystickStart,
    onEnd: handleJoystickEnd,
  })

  updateJoystickButton()

  addMainLoopEffect(({ timeRunning, callbackCount, delta, time }) => {
    const el = document.getElementById('mainLoopEl')!
    el.innerHTML = `Delta (s): ${String(Math.round(delta * 1000) / 1000)}<br />Time (ms): ${String(Math.round(time))}<br />Time running (ms): ${String(Math.round(timeRunning))}<br />CBs: ${callbackCount}`
  })

  addMainLoopEffect(
    ({ timeRunning, callbackCount, delta, time }) => {
      const el = document.getElementById('mainLoopThrottledEl')!
      el.innerHTML = `Delta (s): ${String(Math.round(delta * 1000) / 1000)}<br />Time (ms): ${String(Math.round(time))}<br />Time running (ms): ${String(Math.round(timeRunning))}<br />CBs: ${callbackCount}`
    },
    { throttle: 100 },
  )
})

// @ts-expect-error should define this function in the global scope
window.handleToggleFullscreen = () =>
  getBrowser().isFullscreen ? exitFullscreen() : enterFullscreen()
// @ts-expect-error should define this function in the global scope
window.handleTogglePointerLock = () => (getMouse().locked ? unlockPointer() : lockPointer())
// @ts-expect-error should define this function in the global scope
window.lockOrientation = lockOrientation
// @ts-expect-error should define this function in the global scope
window.unlockOrientation = unlockOrientation
// @ts-expect-error should define this function in the global scope
window.lockKeys = lockKeys
// @ts-expect-error should define this function in the global scope
window.unlockKeys = unlockKeys
// @ts-expect-error should define this function in the global scope
window.toggleJoystickMode = () => {
  joystickMode = joystickMode === 'follow' ? 'origin' : 'follow'
  unsubJoystickArea()
  unsubJoystickArea = mountJoystickArea({
    element: document.getElementById('joystick-area')!,
    mode: joystickMode,
    joystick: getJoysticks().movement,
    onMove: handleJoystickMove,
    onStart: handleJoystickStart,
    onEnd: handleJoystickEnd,
  })
  updateJoystickButton()
}

export const App = html`
  <main class="mx-auto max-w-7xl px-5 pb-16 pt-5" oncontextmenu="event.preventDefault()">
    <div class="mb-5 flex flex-col items-center justify-center gap-6 sm:flex-row">
      <a href="/"
        ><img src="/mana-potion.webp" class="w-28" alt="Logo" width="324" height="460"
      /></a>
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-center gap-3 sm:justify-start">
          <h1 class="text-5xl font-medium"><a href="/">Mana Potion</a></h1>
          <img src="/javascript.svg" class="size-10" alt="JavaScript" />
        </div>
        <h2 class="max-w-lg text-pretty text-center text-lg text-gray-200 sm:text-left">
          Toolkit for JavaScript game development and interactive experiences with
          <a class="underline" href="/react/">React</a>, <a class="underline" href="/vue/">Vue</a>,
          <a class="underline" href="/svelte/">Svelte</a>, and
          <b>vanilla JS</b>
          support.
        </h2>
        <div class="flex items-center justify-center gap-3 sm:justify-start">
          <a
            href="https://github.com/verekia/manapotion"
            target="_blank"
            class="flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/5"
          >
            ${GitHubIcon} GitHub
          </a>
          <a
            href="https://twitter.com/verekia"
            target="_blank"
            class="flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/5"
          >
            ${TwitterIcon} Twitter
          </a>
          <a
            href="https://discord.gg/VXYxGrP8EJ"
            target="_blank"
            class="flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/5"
          >
            ${DiscordIcon} Discord
          </a>
        </div>
      </div>
    </div>
    <div class="mt-10 text-gray-200">
      <div>⚡️ <b>Reactive</b> (subscribed components react to changes)</div>
      <div>🗿 <b>Non-reactive</b> (managed by events or the main loop)</div>
    </div>

    <div class="cols-1 mt-5 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <section>
        <h2 class="section-heading">🌐 Browser</h2>
        ${Item({
          name: 'isFullscreen',
          label: html`<span id="isFullscreen"></span>`,
          extra: html`<button
            id="fullscreenButton"
            class="btn"
            onclick="window.handleToggleFullscreen()"
          ></button>`,
        })}
        ${Item({
          name: 'isPageVisible',
          label: html`<span id="isPageVisible"></span>`,
        })}
        ${Item({
          name: 'isPageFocused',
          label: html`<span id="isPageFocused"></span>`,
        })}
        ${Item({
          name: 'isDesktop',
          label: html`<span id="isDesktop"></span>`,
        })}
        ${Item({
          name: 'isMobile',
          label: html`<span id="isMobile"></span>`,
        })}
        ${Item({
          name: 'isPortrait',
          label: html`<span id="isPortrait"></span>`,
          extra: html`<span class="text-sm">Ratio-based</span>`,
        })}
        ${Item({
          name: 'isLandscape',
          label: html`<span id="isLandscape"></span>`,
          extra: html`<span class="text-sm">Ratio-based</span>`,
        })}
        ${Item({
          name: 'width,height',
          value: html`<span id="windowSize" class="tabular-nums"></span>`,
        })}
        <div class="mt-2">
          <h2>Force mobile orientation (use after fullscreen)</h2>
          <div class="flex flex-wrap gap-2">
            <button class="btn" onclick="window.lockOrientation('landscape')">Landscape</button>
            <button class="btn" onclick="window.lockOrientation('portrait')">Portrait</button>
            <button class="btn" onclick="window.unlockOrientation()">Unlock orientation</button>
          </div>
        </div>
        <div class="mt-2">
          <h2>Keyboard lock (use after fullscreen on desktop)</h2>
          <div class="flex flex-wrap gap-2">
            <button
              class="btn"
              onclick="window.lockKeys(['Escape', 'KeyW', 'KeyA', 'KeyS', 'KeyD'])"
            >
              Lock Esc and WASD
            </button>
            <button class="btn" onclick="window.unlockKeys()">Release keys</button>
          </div>
        </div>
      </section>
      <section>
        <h2 class="section-heading">🖱️ Mouse</h2>
        ${Item({
          name: 'locked',
          label: html`<span id="isMouseLocked"></span>`,
          extra: html`<button
            id="mouseLockButton"
            class="btn"
            onclick="window.handleTogglePointerLock()"
          >
            Lock
          </button>`,
        })}
        ${Item({
          name: 'buttons.left',
          label: html`<span id="mouse-left"></span>`,
        })}
        ${Item({
          name: 'buttons.middle',
          label: html`<span id="mouse-middle"></span>`,
        })}
        ${Item({
          name: 'buttons.right',
          label: html`<span id="mouse-right"></span>`,
        })}
        ${Item({
          name: 'position',
          value: html`<span id="mouse-position" class="tabular-nums"></span>`,
        })}
        ${Item({
          name: 'movement',
          value: html`<span id="mouse-movement" class="tabular-nums"></span>`,
        })}
        ${Item({
          name: 'wheel.y',
          value: html`<span id="mouse-scroll-y" class="tabular-nums"></span>`,
        })}
      </section>
      <section>
        <h2 class="section-heading">⌨️ Keyboard</h2>
        ${Item({
          name: 'codes',
          value: html`<span id="codes"></span>`,
        })}
        ${Item({
          name: 'keys',
          value: html`<span id="keys"></span>`,
        })}
        ${Item({
          name: 'ctrl',
          label: html`<span id="ctrl"></span>`,
        })}
        ${Item({
          name: 'shift',
          label: html`<span id="shift"></span>`,
        })}
        ${Item({
          name: 'alt',
          label: html`<span id="alt"></span>`,
        })}
        ${Item({
          name: 'meta',
          label: html`<span id="meta"></span>`,
        })}
      </section>
      <section>
        <h2 class="section-heading">🕹️ Virtual joysticks</h2>
        <div class="relative w-max">
          <div class="absolute left-[58px] top-[75px] max-w-36 text-center mobile:hidden">
            Switch to 👆 mobile mode in devtools
          </div>
          <div
            id="joystick-area"
            class="relative z-10 h-48 w-64 rounded-md border border-slate-500"
          >
            <div
              id="joystick-current"
              class="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-red-500 opacity-0 transition-opacity"
            ></div>
            <div
              id="joystick-origin"
              class="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-blue-500 opacity-0 transition-opacity"
            ></div>
            <div
              id="joystick-follow"
              class="pointer-events-none absolute -bottom-6 -left-6 size-12 rounded-full bg-green-500 opacity-0 transition-opacity"
            ></div>
          </div>
          <div class="mt-3 flex items-center justify-center gap-3">
            Mode
            <button
              class="btn capitalize"
              onclick="window.toggleJoystickMode()"
              id="joystick-mode-btn"
            ></button>
          </div>
        </div>
      </section>
      <section>
        <h2 class="section-heading">🔄 Main loop</h2>
        <div><b>addMainLoopEffect</b></div>
        <div id="mainLoopEl" class="tabular-nums"></div>
        <div>
          <div>
            <b>addMainLoopEffect (throttled)</b>
          </div>
          <div id="mainLoopThrottledEl" class="tabular-nums"></div>
        </div>
      </section>
      <section>
        <h2 class="section-heading">🍃 Tailwind</h2>
        <div>
          <div>
            Current width range:
            <span class="hidden max-5xs:inline">5xs and below</span>
            <span class="hidden 5xs:max-4xs:inline">5xs to 4xs</span>
            <span class="hidden 4xs:max-3xs:inline">4xs to 3xs</span>
            <span class="hidden 3xs:max-2xs:inline">3xs to 2xs</span>
            <span class="hidden 2xs:max-xs:inline">2xs to xs</span>
            <span class="hidden xs:max-sm:inline">xs to sm</span>
            <span class="hidden sm:max-md:inline">sm to md</span>
            <span class="hidden md:max-lg:inline">md to lg</span>
            <span class="hidden lg:max-xl:inline">lg to xl</span>
            <span class="hidden xl:max-2xl:inline">xl to 2xl</span>
            <span class="hidden 2xl:max-3xl:inline">2xl to 3xl</span>
            <span class="hidden 3xl:max-4xl:inline">3xl to 4xl</span>
            <span class="hidden 4xl:max-5xl:inline">4xl to 5xl</span>
            <span class="hidden 5xl:inline">5xl and up</span>
          </div>
          <div>
            Current height range:
            <span class="hidden max-5xs-h:inline">5xs and below</span>
            <span class="hidden 5xs-h:max-4xs-h:inline">5xs to 4xs</span>
            <span class="hidden 4xs-h:max-3xs-h:inline">4xs to 3xs</span>
            <span class="hidden 3xs-h:max-2xs-h:inline">3xs to 2xs</span>
            <span class="hidden 2xs-h:max-xs-h:inline">2xs to xs</span>
            <span class="hidden xs-h:max-sm-h:inline">xs to sm</span>
            <span class="hidden sm-h:max-md-h:inline">sm to md</span>
            <span class="hidden md-h:max-lg-h:inline">md to lg</span>
            <span class="hidden lg-h:max-xl-h:inline">lg to xl</span>
            <span class="hidden xl-h:max-2xl-h:inline">xl to 2xl</span>
            <span class="hidden 2xl-h:max-3xl-h:inline">2xl to 3xl</span>
            <span class="hidden 3xl-h:max-4xl-h:inline">3xl to 4xl</span>
            <span class="hidden 4xl-h:max-5xl-h:inline">4xl to 5xl</span>
            <span class="hidden 5xl-h:inline">5xl and up</span>
          </div>
        </div>
      </section>
    </div>
  </main>
`
