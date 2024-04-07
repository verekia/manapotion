<h1 align="center">Mana Potion</h1>

<p align="center">
  <img src="/examples/react/public/mana-potion.webp" alt="Mana Potion" width="162" height="230" />
</p>

🧪 **Mana Potion** is a toolkit for JavaScript game development and interactive experiences. It is _not_ a game engine or framework but a collection of **low-level utilities and helpers** commonly needed when building games.

Mana Potion supports React, Vue, Svelte, and vanilla JavaScript. It is a particularly great fit for people who build games or experiences in [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [TresJS](https://tresjs.org/), [Threlte](https://threlte.xyz/), and vanilla [Three.js](https://threejs.org/), but it can be used in any context.

The library consists of:

- [**Listeners and a reactive store for inputs and browser state**](#getting-started)
- [**A main loop**](#main-loop)
- [**Headless virtual joysticks**](#virtual-joysticks)
- [**Browser API helpers**](#browser-api-helpers)
- [**Tailwind media queries**](#tailwind)
<!-- - [**Extra hooks for React Three Fiber**](#react-three-fiber) -->

**Important**: Until we hit 1.0.0, expect breaking changes in minor versions.

## Demos

Check out the [**React**](https://manapotion.org/), [**Vue**](https://vue.manapotion.org/), [**Svelte**](https://svelte.manapotion.org/), and [**vanilla JS**](https://vanilla.manapotion.org/) demos.

## Installation

<!-- - If you use **React Three Fiber**, install `@manapotion/r3f` -->

- If you use **React**, install `@manapotion/react`
- If you use **Vue**, install `@manapotion/vue`
- If you use **Svelte**, install `@manapotion/svelte`
- If you don't use these frameworks, install `@manapotion/vanilla`

## Getting started

Add `<Listeners />` somewhere in your app:

**React, Vue, Svelte**

```jsx
import { Listeners } from '@manapotion/react' // or vue, svelte

const App = () => (
  <>
    <div>Your game</div>
    <Listeners />
  </>
)
```

**Vanilla**

```js
import { listeners } from '@manapotion/vanilla'

const unsub = listeners({})

// call unsub() to stop listening
```

This will automatically give you access to some reactive and non-reactive variables. If you do not want to listen to every event supported by the library, you can cherry-pick individual listeners (for example, `<MouseMoveListener />` or `<FullscreenListener />`).

🗿 **Non-reactive** variables may be frequently updated and should be accessed imperatively in your main loop or in event handlers via `getMouse`, `getKeyboard`, and `getBrowser`:

```jsx
import { getMouse, getKeyboard, getBrowser } from '@manapotion/react' // or vue, svelte, vanilla

const animate = () => {
  const { right } = getMouse().buttons
  const { KeyW } = getKeyboard().codes
  const { isFullscreen } = getBrowser()
  // ...
}
```

⚡️ **Reactive** variables can be accessed imperatively too, but also reactively in components to trigger re-renders:

**React**

Use the `useMouse`, `useKeyboard`, and `useBrowser` hooks with a selector to access variables reactively:

```jsx
import { useMouse, useBrowser, useKeyboard } from '@manapotion/react'

const Component = () => {
  const isRightButtonDown = useMouse(s => s.buttons.right)
  const { KeyW } = useKeyboard(s => s.codes)
  const isFullscreen = useBrowser(s => s.isFullscreen)

  // Some reactive component
  return ( /* ... */ )
}
```

**Vue**

```vue
<script setup lang="ts">
import { mouse, browser, keyboard } from '@manapotion/vue'
</script>

<template>
  <div>{{ mouse.buttons.right }}</div>
  <div>{{ browser.isFullscreen }}</div>
  <div>{{ keyboard.codes.KeyW }}</div>
</template>
```

**Svelte**

```svelte
<script lang="ts">
  import { mouse, browser, keyboard } from '@manapotion/svelte'
</script>

  <div>{$mouse.buttons.right}</div>
  <div>{$browser.isFullscreen}</div>
  <div>{$keyboard.codes.KeyW}</div>
```

**Vanilla**

There is no reactivity system in vanilla JavaScript, so you can use [callbacks](#callbacks) to update your app state when the store changes. You can also subscribe to the Zustand store directly to watch for changes:

```js
import { mouseStore } from '@manapotion/vanilla'

const unsub = mouseStore.subscribe(state => {
  console.log(state.buttons.right)
})
```

Here are the variables available:

Legend: ⚡️ **Reactive**, 🗿 **Non-reactive**, 🚧 **Not implemented yet**

### 🌐 Browser

- ⚡️ `browser.isFullscreen`
- ⚡️ `browser.isPageVisible`
- ⚡️ `browser.isPageFocused`
- ⚡️ `browser.isDesktop` / `browser.isMobile`
- ⚡️ `browser.isLandscape` / `browser.isPortrait`
- 🗿 `browser.width`
- 🗿 `browser.height`
- 🚧 `pointerLockSupported`

### 🖱️ Mouse

- ⚡️ `mouse.buttons.left`
- ⚡️ `mouse.buttons.middle`
- ⚡️ `mouse.buttons.right`
- ⚡️ `mouse.locked`
- 🗿 `mouse.position.x`
- 🗿 `mouse.position.y` (the bottom of the screen is 0)
- 🗿 `mouse.movement.x`
- 🗿 `mouse.movement.y` (going up is positive)
- 🗿 `mouse.wheel.y` (delta)

You can import and use `resetMouse` to reinitialize the mouse data.

### ⌨️ Keyboard

- ⚡️ `keyboard.codes`
- ⚡️ `keyboard.keys`
- ⚡️ `keyboard.ctrl`
- ⚡️ `keyboard.shift`
- ⚡️ `keyboard.alt`
- ⚡️ `keyboard.meta`

⚡️ `keyboard` contains keys that are available in two versions, `codes` and `keys`. This lets you decide if you want to use the [physical location](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard_API#writing_system_keys) (`codes`) of the key or the character being typed as a key (`keys`). Using the physical location is better for game controls such as using WASD to move a character, because it is agnostic to the user's keyboard layout (did you know French keyboards are not QWERTY but AZERTY?).

Here is how you would handle going forward when the user presses W (or Z on French keyboards):

```js
const animate = () => {
  const { KeyW } = getKeyboard().codes

  if (KeyW) {
    // Go forward
  }
}
```

For keyboard events, just like all other events, you can add a custom callback to `<Listeners />`:

```jsx
const App = () => {
  const handleKeyDown = e => {
    if (e.code === 'Space') {
      jump()
    }
  }

  return (
    <>
      <div>Your game</div>
      <Listeners onKeyDown={handleKeyDown} />
    </>
  )
}
```

You can import and use `resetKeyboard` to reinitialize the keyboard data.

This is useful to prevent keys from staying pressed when switching between tabs or when the game loses focus:

```jsx
import { Listeners, resetKeyboard, resetMouse } from '@manapotion/react'

const App = () => (
  <Listeners
    onPageFocusChange={() => {
      resetKeyboard()
      resetMouse()
    }}
    onPageVisibilityChange={() => {
      resetKeyboard()
      resetMouse()
    }}
  />
)
```

If your game requires holding a key to perform some action, this technique can prevent players cheating by holding the key and switching tabs.

### Callbacks

You can provide custom event callbacks to `<Listeners />` or to individual listeners:

**React**

```jsx
<Listeners onFullscreenChange={handleFullscreenChange} />
/* or */
<FullscreenListener onFullscreenChange={handleFullscreenChange} />
```

**Vue**

```vue
<Listeners @fullscreenChange="handleFullscreenChange" />
<!-- or -->
<FullscreenListener @fullscreen-change="handleFullscreenChange" />
```

**Svelte**

```svelte
<Listeners on:fullscreenChange={handleFullscreenChange} />
<!-- or -->
<FullscreenListener on:fullscreenChange={handleFullscreenChange} />
```

**Vanilla**

```js
listeners({ onFullscreenChange: handleFullscreenChange })
// or
mountFullscreenListener({ onFullscreenChange: handleFullscreenChange })
```

Please check the TypeScript types for the available callbacks.

Once mounted, you cannot modify the callbacks dynamically. If you need to change them, you will need to unmount and remount the component. If you have use cases of callbacks changed dynamically, please let me know on [Discord](https://discord.gg/VXYxGrP8EJ).

## Main loop

The `useMainLoop` hook can be used to schedule your various systems in a single `requestAnimationFrame` call that you can configure per component:

**React**

```jsx
import { useRef } from 'react'
import { useMainLoop } from '@manapotion/react'

import player from './player'

const Player = () => {
  const ref = useRef<HTMLDivElement>(null)

  useMainLoop(({ delta, elapsed }) => {
    ref.current!.style.transform = `translate(${player.x}px, ${player.y}px)`
  })

  return <div ref={ref}>Player</div>
}
```

**Vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useMainLoop } from '@manapotion/vue'

import player from './player'

const playerRef = ref<HTMLDivElement | null>(null)

useMainLoop(({ delta, elapsed }) => {
  playerRef.value!.style.transform = `translate(${player.x}px, ${player.y}px)`
})
</script>

<template>
  <div ref="playerRef">Player</div>
</template>
```

**Svelte**

```svelte
<script lang="ts">
  import { useMainLoop } from '@manapotion/svelte'

  import player from './player'

  let playerEl: HTMLDivElement

  useMainLoop(({ delta, elapsed }) => {
    playerEl.style.transform = `translate(${player.x}px, ${player.y}px)`
  })
</script>

<div bind:this={playerEl}>Player</div>
```

**Vanilla**

```ts
import { addMainLoopEffect } from '@manapotion/vanilla'

const unsub = addMainLoopEffect(({ delta, elapsed }) => {
  // Your animation loop
})

// call unsub() to stop the animation loop
```

### Throttling

You can throttle some callbacks by passing a `throttle` option to `useAnimationFrame`/`startAnimationFrame`:

```jsx
useMainLoop(
  ({ delta, elapsed }) => {
    // Your animation loop
  },
  { throttle: 100 } // ms
)
```

### Stages

Organize your main loop into stages to run your systems in a specific order (using arbitrary numbers):

```jsx
export const STAGE_CONTROLS = -5
export const STAGE_PHYSICS = -4
export const STAGE_LOGIC = -2
export const STAGE_RENDER = 0 // Default stage
export const STAGE_UI = 5
export const STAGE_CLEANUP = 10

const HealthBar = () => {
  useMainLoop(
    () => {
      // Adjust health bar width
    },
    { stage: STAGE_UI, throttle: 100 }
  )
}

const Physics = () => {
  useMainLoop(
    () => {
      // Update physics
    },
    { stage: STAGE_PHYSICS }
  )
}
```

You can pause and resume the main loop with `pauseMainLoop` and `resumeMainLoop`:

```jsx
<Listeners
  onPageFocusChange={({ isPageFocused }) => {
    isPageFocused ? resumeMainLoop() : pauseMainLoop()
  }}
/>
```

## Virtual joysticks

Mana Potion includes **🗿 non-reactive** and **headless** virtual joysticks for mobile controls. Each virtual joystick is associated with a single `<JoystickArea />`. You can create your own Joystick objects with `createJoystick()` or use one of the two default ones that are already available on the joysticks store. The default ones are called `movement` and `rotation` joysticks.

You can choose between 2 modes, `follow` or `origin`, and can adjust the `maxFollowDistance` or `maxOriginDistance`. Use the `onStart`, `onMove`, and `onEnd` callbacks to update your game state and optionally show a joystick on the screen.

```jsx
import { JoystickArea, getJoysticks } from '@manapotion/react'

const MobileUI = () => (
  <JoystickArea
    joystick={getJoysticks().movement}
    mode="follow" // Default
    maxFollowDistance={50} // Default
    onStart={handleStart}
    onMove={handleMove}
    onEnd={handleEnd}
  />
)
```

With vanilla JS, use `mountJoystickArea` instead.

In follow mode, the joystick will follow the user's finger, which is good for player movement.

Here are the properties that will be updated on your joystick object:

- 🗿 `joystick.isActive`
- 🗿 `joystick.identifier`
- 🗿 `joystick.origin.x` / `joystick.origin.y`
- 🗿 `joystick.origin.angle`
- 🗿 `joystick.origin.distance`
- 🗿 `joystick.origin.distanceRatio`
- 🗿 `joystick.follow.x` / `joystick.follow.y`
- 🗿 `joystick.follow.angle`
- 🗿 `joystick.follow.distance`
- 🗿 `joystick.follow.distanceRatio`
- 🗿 `joystick.current.x`/ `joystick.current.y`
- 🗿 `joystick.movement.x` / `joystick.movement.y`

See the [example of how to style your joystick](https://github.com/verekia/manapotion/blob/main/examples/react/src/MobileJoystick.tsx).

Multitouch within a single area is not supported, but you can create multiple `<JoystickArea />`. One for movement and one for camera rotation for example.

## Browser API Helpers

Mana Potion provides helper functions to reduce some browser APIs boilerplate:

- `enterFullscreen`
- `exitFullscreen`
- `lockOrientation`
- `unlockOrientation`
- `lockPointer`
- `unlockPointer`
- `lockKeys`
- `unlockKeys`

For a fully immersive experience of an FPS game for example, when the player clicks Play or the Fullscreen button, you might want to call multiple helpers in a row like this:

```jsx
import {
  enterFullscreen,
  exitFullscreen,
  lockOrientation,
  unlockOrientation,
  lockKeys,
  unlockKeys,
  useIsFullscreen,
} from '@manapotion/react'

const FullscreenButton = () => {
  const isFullscreen = useIsFullscreen()

  return (
    <button
      onClick={() => {
        if (isFullscreen) {
          exitFullscreen()
          unlockKeys()
          unlockOrientation()
        } else {
          enterFullscreen()
          lockOrientation('landscape')
          lockKeys(['Escape', 'KeyW', 'KeyA', 'KeyS', 'KeyD'])
        }
      }}
    >
      Toggle fullscreen
    </button>
  )
}
```

**Note**: Locking keys is a [Chrome experimental feature](https://developer.chrome.com/blog/better-full-screen-mode) to maintain fullscreen when players press Esc (they have to hold it instead). It lets games show in-game dialogs that players can close with Esc without leaving fullscreen.

# Tailwind

Mana Potion provides a Tailwind theme containing the following `screens` breakpoints:

- 5xs: 192px
- 4xs: 256px
- 3xs: 320px
- 2xs: 384px
- xs: 512px
- sm: 640px - Tailwind default
- md: 768px - Tailwind default
- lg: 1024px - Tailwind default
- xl: 1280px - Tailwind default
- xxl: 1536px - Tailwind default
- 3xl: 1792px
- 4xl: 2048px
- 5xl: 2560px

Making games often involves supporting landscape mode on mobile devices, which require height media queries. The same values are used for the height media queries, but with a `*-h` suffix. So you can do:

- `xs-h:bg-red-500`: Only for screens taller than 512px.
- `sm:xs-h:bg-red-500`: Only for screens wider than 640px and taller than 512px.
- `sm:max-md:xs-h:max-sm-h:bg-red-500`: Only between 640px to 768px wide and 512px to 640px high.

There is currently a [bug in Tailwind](https://github.com/tailwindlabs/tailwindcss/issues/13022) preventing `max-*` classes from being generated when using non-pixel values including raw queries, which prevents us from having height media queries. This package contains a fix for this issue.

There are also `desktop` and `mobile` media queries that you can use to target mobile and desktop devices:

- `desktop:bg-red-500`: Only for desktop devices.
- `mobile:bg-red-500`: Only for mobile devices (includes tablets).

To add the theme to your Tailwind config:

```js
/** @type {import('tailwindcss').Config} */
import { tailwindTheme as manapotionTheme } from '@manapotion/react' // or vue, svelte, vanilla

export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    screens: manapotionTheme.screens,
    extend: {
      screens: manapotionTheme.extend.screens,
    },
  },
}
```

<!-- ## React Three Fiber

**`@manapotion/r3f`** includes hooks to run logic inside the main R3F `requestAnimationFrame` loop. They are simple hooks around [`addEffect`, `addAfterEffect`, and `addTail`](https://docs.pmnd.rs/react-three-fiber/api/additional-exports). See R3F [loop source](https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/loop.ts).

```jsx
import { useFrameEffect, useFrameAfterEffect, useFrameTail } from '@manapotion/r3f'

const Scene = () => {
  useFrameEffect(() => {
    // Runs at the beginning of the animation loop
  })

  useFrameAfterEffect(() => {
    // Runs at the end of the animation loop
  })

  useFrameTail(() => {
    // Runs when the animation loop stops
  })

  // ...
}
```

You can use `useFrameEffect` to animate your UI outside of the `Canvas`, but you might want to throttle it with the `throttle` option:

```jsx
useFrameEffect(
  ({ delta, elapsed }) => {
    // Your animation loop
  },
  { throttle: 100 } // ms
)
``` -->

## General tips

- Clamp your device pixel ratio from 1 to 1.5. The sharpness of a DPR of 2 or more for high-density screens is not worth the performance hit (at least on mobile).
- On mobile, clamp your frame rate to 60 FPS. It will prevent high-framerate devices from overheating and saves battery life.
- If you use Three.js, some [math utilites](https://threejs.org/docs/#api/en/math/MathUtils) such as `clamp`, `lerp`, and `smoothstep` are included in Three.js

## Community

Join the [Mana Potion Discord server](https://discord.gg/VXYxGrP8EJ).

## Contributing

See the [contributing guide](https://github.com/verekia/manapotion/blob/main/CONTRIBUTING.md).

## License

MIT

## Author

Created by [@verekia](https://twitter.com/verekia) for 🔮 [MiniMana.io](https://minimana.io/)

Visit 🌐 [WebGameDev.com](https://webgamedev.com/) and [join the Web Game Dev](https://webgamedev.com/discord) community.
