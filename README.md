<h1 align="center">Mana Potion</h1>

<p align="center">
  <img src="/examples/react/public/mana-potion.webp" alt="Mana Potion" width="162" height="230" />
</p>

Mana Potion is a toolkit for JavaScript game development and interactive experiences. It supports React, Vue, and vanilla JavaScript. Svelte coming soon.

**Important**: Mana Potion is in early development and the API is subject to change. Until we hit 1.0.0, expect breaking changes in minor versions.

## What is Mana Potion?

Mana Potion consists of:

- [**Listeners and a reactive store**](#listeners-and-reactive-store)
- [**Animation loops**](#animation-loops)
- [**Headless virtual joysticks**](#virtual-joysticks)
- [**Browser API helpers**](#browser-api-helpers)
- [**General math and gamedev utilities**](#utilities)
- [**Tailwind media queries**](#tailwind)
- [**Extra hooks for React Three Fiber**](#react-three-fiber)

## Installation

- If you use React Three Fiber, install `@manapotion/r3f`
- If you use React _without R3F_, install `@manapotion/react`
- If you use Vue, install `@manapotion/vue`
- If you don't use these frameworks, install `@manapotion/vanilla`

## Listeners and reactive store

At the heart of Mana Potion is a [Zustand](https://github.com/pmndrs/zustand) store that gets updated by event listeners. You can access this store imperatively in your animation loop or reactively in your components.

The listeners available are:

- `<MouseButtonsListener />`
- `<MouseMoveListener />`
- `<MouseScrollListener />`
- `<KeyboardListener />`
- `<PointerLockListener />`
- `<FullscreenListener />`
- `<ResizeListener />`
- `<DeviceTypeListener />`
- `<ScreenOrientationListener />`
- `<PageVisibilityListener />`
- `<PageFocusListener />`

To enable them all, simply add `<Listeners />` to your app:

**React**

```jsx
import { Listeners } from '@manapotion/react'

const App = () => (
  <>
    <div>Your game</div>
    <Listeners />
  </>
)
```

**Vue**

```vue
<script setup lang="ts">
import { Listeners } from '@manapotion/vue'
</script>

<template>
  <div>Your game</div>
  <Listeners />
</template>
```

**Vanilla**

```js
import { listeners } from '@manapotion/vanilla'

const unsubscribe = listeners({})

// call unsubscribe() to stop listening
```

This will automatically give you access to some reactive and non-reactive variables.

🗿 **Non-reactive** variables may be frequently updated and should be accessed imperatively in your main loop:

```jsx
import { mp } from '@manapotion/react' // or /vue or /vanilla

const animate = () => {
  const { mouseMovementX } = mp()
  // Move the camera
}
```

⚡️ **Reactive** variables can similarly be accessed imperatively:

```jsx
const animate = () => {
  const { isRightMouseDown } = mp()

  if (isRightMouseDown) {
    // Some imperative logic
  }
}
```

Or reactively in components to trigger re-renders:

**React**

There are hooks available for all the reactive variables, but you can also use `useMP` by passing a selector to it:

```jsx
import { useMP, useIsLeftMouseDown } from '@manapotion/react'

const Component = () => {
  const isLeftMouseDown = useIsLeftMouseDown()
  // or
  const isRightMouseDown = useMP(s => s.isRightMouseDown)

  // Some reactive component
  return ( /* ... */ )
}
```

**Vue**

All the reactive variables are available as refs, either individually or via `mpRefs`:

```vue
<script setup lang="ts">
import { isLeftMouseDown, mpRefs } from '@manapotion/vue'
</script>

<template>
  <div>{{ isLeftMouseDown }}</div>
  <div>{{ mpRefs.isRightMouseDown }}</div>
</template>
```

**Vanilla**

There is no reactivity system in vanilla JavaScript, so you can use [callbacks](#callbacks) to update your app state when the store changes. You can also subscribe to the Zustand store directly to watch for changes:

```js
import { manaPotionStore } from '@manapotion/vanilla'

const unsubscribe = manaPotionStore.subscribe(state => {
  console.log(state.isLeftMouseDown)
})
```

Here are the variables available:

Legend: ⚡️ **Reactive**, 🗿 **Non-reactive**

### 🌐 General browser state

- ⚡️ `isPointerLocked`
- ⚡️ `isFullscreen`
- ⚡️ `isPageVisible`
- ⚡️ `isPageFocused`
- ⚡️ `isDesktop` / `isMobile`
- ⚡️ `isLandscape` / `isPortrait`
- 🗿 `windowWidth`
- 🗿 `windowHeight`

### 🕹 Inputs

- ⚡️ `isLeftMouseDown`
- ⚡️ `isMiddleMouseDown`
- ⚡️ `isRightMouseDown`
- ⚡️ `keys`
- 🗿 `mouseX`
- 🗿 `mouseY` (the bottom of the screen is 0)
- 🗿 `mouseMovementX`
- 🗿 `mouseMovementY` (going up is positive)
- 🗿 `mouseWheelDeltaY`

### Keys

Keyboard `keys` are available in two versions,`keys.byCode` and `keys.byKey`. This lets you decide if you want to use the [physical location](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard_API#writing_system_keys) (`byCode`) of the key or the character being typed as a key (`byKey`). Using the physical location is better for game controls such as using WASD to move a character, because it is agnostic to the user's keyboard layout (did you know French keyboards are not QWERTY but AZERTY?).

Here is how you would handle going forward when the user presses W (or Z on French keyboards):

```js
const animate = () => {
  if (mp().keys.byCode.KeyW) {
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

### Callbacks

You can provide custom event callbacks to `<Listeners />` or to individual listeners:

**React**

```jsx
<Listeners onFullscreenUpdate={handleFullscreenUpdate} />
/* or */
<FullscreenListener onFullscreenUpdate={handleFullscreenUpdate} />
```

**Vue**

```vue
<Listeners @fullscreenUpdate="handleFullscreenUpdate" />
<!-- or -->
<FullscreenListener @fullscreenUpdate="handleFullscreenUpdate" />
```

**Vanilla**

```js
listeners({ onFullscreenUpdate: handleFullscreenUpdate })
// or
mountFullscreenListener({ onFullscreenUpdate: handleFullscreenUpdate })
```

Please check the TypeScript types for the available callbacks.

Once mounted, you cannot modify the callbacks dynamically. If you need to change them, you will need to unmount and remount the component. If you have use cases of callbacks changed dynamically, please let me know on [Discord](https://discord.gg/29RGwTBTay).

## Animation loops

If you are not using React Three Fiber or TresJS, you will need an animation loop to update your scene elements. You can use the `useAnimationFrame` hook to run your animation loop per component:

**React**

```jsx
import { useRef } from 'react'
import { useAnimationFrame } from '@manapotion/react'

import player from './player'

const Player = () => {
  const ref = useRef<HTMLDivElement>(null)

  useAnimationFrame(({ delta, elapsed }) => {
    ref.current!.style.transform = `translate(${player.x}px, ${player.y}px)`
  })

  return <div ref={ref}>Player</div>
}
```

**Vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useAnimationFrame } from '@manapotion/vue'

import player from './player'

const playerRef = ref<HTMLDivElement | null>(null)

useAnimationFrame(({ delta, elapsed }) => {
  playerRef.value!.style.transform = `translate(${player.x}px, ${player.y}px)`
})
</script>

<template>
  <div :ref="playerRef">Player</div>
</template>
```

**Vanilla**

```ts
import { startAnimationFrame } from '@manapotion/vanilla'

const unsubscribe = startAnimationFrame(({ delta, elapsed }) => {
  // Your animation loop
})

// call unsubscribe() to stop the animation loop
```

## Virtual joysticks

⚠️ React-only for now ⚠️

Mana Potion includes **🗿 non-reactive** and **headless** virtual joysticks for mobile controls. You must create a joystick object with `createJoystick()`, and pass it to `<JoystickArea />`. You can choose between 2 modes, follow or origin, by setting `maxFollowDistance` or `maxOriginDistance`:

```jsx
import { JoystickArea, createJoystick } from '@manapotion/react'

const joystick = createJoystick()

const MobileUI = () => {
  return (
    <JoystickArea
      joystick={joystick}
      maxFollowDistance={50}
      // OR
      maxOriginDistance={50}
    />
  )
}
```

In follow mode, the joystick will follow the user's finger, which is good for player movement.

Here are the properties that will be updated on your joystick object:

- `isActive`
- `identifier`
- `originX`
- `originY`
- `originAngle`
- `originDistance`
- `originDistanceRatio`
- `followX`
- `followY`
- `followAngle`
- `followDistance`
- `followDistanceRatio`
- `currentX`
- `currentY`
- `movementX`
- `movementY`

See the [example of how to style your joystick](https://github.com/verekia/manapotion/blob/main/examples/react/src/MobileJoystick.tsx).

Multitouch within a single area is not supported, but you can create multiple `<JoystickArea />`. One for movement and one for camera rotation for example.

### Augmenting the store

You can add your own variables to the store by augmenting the `ManaPotionState` interface from `@manapotion/react`, `@manapotion/vue`, or `@manapotion/vanilla` in a global definition file such as `global.d.ts` at the root of your project:

```ts
import { ManaPotionState } from '@manapotion/react'

declare module '@manapotion/react' {
  interface ManaPotionState {
    foo: number
  }
}
```

You can then set it imperatively as `mp().foo = 3` or reactively with `mp().setCustom('foo', 3)`.

For example, to add your joysticks to the Mana Potion store, you can define them like this in `global.d.ts`:

```ts
import { Joystick, ManaPotionState } from '@manapotion/react'

declare module '@manapotion/react' {
  interface ManaPotionState {
    movementJoystick: Joystick
    cameraJoystick: Joystick
  }
}
```

Then, initialize them somewhere in your app:

```jsx
mp().movementJoystick = createJoystick()
mp().cameraJoystick = createJoystick()
```

Finally, pass them to your `<JoystickArea />` components:

```jsx
const MobileUI = () => (
  <>
    <JoystickArea joystick={mp().movementJoystick} maxFollowDistance={50} />
    <JoystickArea joystick={mp().cameraJoystick} maxFollowDistance={50} />
  </>
)
```

Note that you don't have to do this, you can just make them a global variable somewhere in your app, or put them in your own store. This is just a way to keep all inputs in the Mana Potion store.

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

# Utilities

Mana Potion provides a few utility functions that are useful for JS gamedev and animations in general.

- `lerp`: Linear interpolation.
- `clamp`: Clamps a number between a minimum and a maximum value.
- `throttle`: Throttles a function by a given time in ms.
- `debounce`: Debounces a function by a given time in ms.
- `throttleDebounce`: Throttles a function by a given time in ms, but also makes a final call to it after the throttle time has passed.

# Tailwind

**`@manapotion/tailwind`** is a package that needs to be installed separately and provides a theme containing the following `screens` breakpoints:

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
import { theme } from '@manapotion/tailwind'

export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    screens: theme.screens,
    extend: {
      screens: theme.extend.screens,
    },
  },
}
```

## React Three Fiber

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

You can use `useFrameEffect` to animate your UI outside of the `Canvas`.

## Community

Join the [Mana Potion Discord server](https://discord.gg/29RGwTBTay).

## Contributing

See the [contributing guide](https://github.com/verekia/manapotion/blob/main/CONTRIBUTING.md).

## License

MIT

## Author

Created by [@verekia](https://twitter.com/verekia) for 🔮 [MiniMana.io](https://minimana.io/)

Visit 🌐 [WebGameDev.com](https://webgamedev.com/) and [join the Web Game Dev](https://webgamedev.com/discord) community.
