<h1 align="center">Mana Potion</h1>

<p align="center">
  <img src="/examples/react/public/mana-potion.webp" alt="Mana Potion" width="162" height="230" />
</p>

Mana Potion is a toolkit to make web game development easier. It is currently mainly aimed at React and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) projects, but it can be used in non-React projects as well. Vue support is in progress.

**Important**: Mana Potion is in early development and the API is subject to change. Until we hit 1.0.0, expect breaking changes in minor versions.

## Installation

Mana Potion consists of:

- [**`@manapotion/react`**](#react-listeners-store-and-virtual-joystick): React listeners, store, and virtual joystick
- [**`@manapotion/browser`**](#browser-api-helpers): Browser API helpers
- [**`@manapotion/r3f`**](#react-three-fiber): React Three Fiber WebGPU canvas and hooks
- [**`@manapotion/util`**](#utilities): General gamedev utilities
- [**`@manapotion/vue`**](#vue-listeners-and-store): Vue listeners and store (WIP)
- [**`@manapotion/vanilla`**](#vanilla-listeners-and-store): Framework-agnostic listeners and store (WIP)
- [**`@manapotion/tailwind`**](#tailwind): Tailwind media queries

Due to the way Three.js' `WebGPURenderer` is written, in order to use `@manapotion/r3f` with Vite, you will need to add [top-level await support](https://github.com/verekia/manapotion/blob/main/examples/react/vite.config.ts).

If you are making a React game without React Three Fiber, install `@manapotion/react`:

```sh
# NPM
npm install @manapotion/react
# Yarn
yarn add @manapotion/react
# PNPM
pnpm add @manapotion/react
# Bun
bun add @manapotion/react
```

If you are making a React Three Fiber game, install `@manapotion/r3f` instead:

```sh
# NPM
npm install @manapotion/r3f
# Yarn
yarn add @manapotion/r3f
# PNPM
pnpm add @manapotion/r3f
# Bun
bun add @manapotion/r3f
```

If you are making a Vue game, install `@manapotion/vue`:

```sh
# NPM
npm install @manapotion/vue
# Yarn
yarn add @manapotion/vue
# PNPM
pnpm add @manapotion/vue
# Bun
bun add @manapotion/vue
```

If you are making a game without any of these frameworks, install `@manapotion/vanilla`:

```sh
# NPM
npm install @manapotion/vanilla
# Yarn
yarn add @manapotion/vanilla
# PNPM
pnpm add @manapotion/vanilla
# Bun
bun add @manapotion/vanilla
```

## React Listeners, Store, and Virtual Joystick

⚛️ **`@manapotion/react`** is the main package of Mana Potion. It contains listeners that update a reactive store which you can use as a hook in your components or access directly in your imperative code.

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

```jsx
import { Listeners } from '@manapotion/react'

const App = () => (
  <>
    <div>Your game</div>
    <Listeners />
  </>
)
```

This will automatically give you access to some reactive and non-reactive variables.

🗿 **Non-reactive** variables may be frequently updated and should be accessed imperatively in your main loop:

```jsx
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

Or reactively in components to trigger a re-render with the `useMP` hook. It is a [Zustand](https://github.com/pmndrs/zustand) store, so you must pass a selector to it:

```jsx

const Component = () => {
  const isRightMouseDown = useMP(s => s.isRightMouseDown)

  // Some reactive component
  return ( /* ... */ )
}
```

Here are the variables available:

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

### Coming soon

- 🚧 Gamepads

### Callbacks

You can provide custom event callbacks to `<Listeners />` or to individual listeners:

```jsx
<Listeners onFullscreenUpdate={handleFullscreenUpdate} />
/* or */
<FullscreenListener onFullscreenUpdate={handleFullscreenUpdate} />
```

Be careful however: if the parent component of `Listeners` is re-rendered and you didn't memoize the callback (`handleFullscreenChange` here), `Listeners` will also re-render. Some of Mana Potion's Listeners run once when initialized, which will cause your callback to be called as well.

```jsx
const App = () => {
  const [count, setCount] = useState(0)

  const handleFullscreenUpdate = () => {
    console.log('Fullscreen changed') // This will be logged every time we click the button
  }

  return (
    <>
      <button onClick={() => setCount(count + 1)} />
      <Listeners onFullscreenUpdate={handleFullscreenUpdate} />
    </>
  )
}
```

To avoid this, you can stabilize your functions with `useCallback`:

```jsx
const App = () => {
  const [count, setCount] = useState(0)

  const handleFullscreenUpdate = useCallback(() => {
    console.log('Fullscreen changed') // This will be logged only when the fullscreen changes
  }, [])

  return (
    <>
      <button onClick={() => setCount(count + 1)} />
      <Listeners onFullscreenUpdate={handleFullscreenUpdate} />
    </>
  )
}
```

Or you can structure your app so that the Listeners are not re-rendered, for example by putting them in a separate component:

```jsx
const UI = () => {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)} />
}

const App = () => {
  const handleFullscreenUpdate = () => {
    console.log('Fullscreen changed') // This will be logged every time the component re-renders
  }

  return (
    <>
      <UI />
      <Listeners onFullscreenUpdate={handleFullscreenUpdate} />
    </>
  )
}
```

The listeners that won't be an issue even with many re-renders are:

- ✅ KeyboardListener
- ✅ MouseButtonsListener
- ✅ MouseMoveListener
- ✅ PageFocusListener

The Listeners that are called once when initialized and may need memoization depending on your use case are:

- ⚠️ FullscreenListener
- ⚠️ PageVisibilityListener
- ⚠️ PointerlockListener
- ⚠️ ResizeListener
- ⚠️ DeviceTypeListener
- ⚠️ ScreenOrientationListener

This mechanism may be improved in the future.

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

### Mobile Joysticks

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

You can add your own variables to the store by augmenting the `ManaPotionState` interface from `@manapotion/react` or from `manapotion` in a global definition file such as `global.d.ts` at the root of your project:

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

## Vue Listeners and Store

This package is a work in progress.

## Vanilla Listeners and Store

This package is a work in progress.

## Browser API Helpers

🌐 **`@manapotion/browser`** provides helper functions to reduce some browser APIs boilerplate:

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
} from '@manapotion/browser'
import { useMp } from '@manapotion/react'

const FullscreenButton = () => {
  const isFullscreen = useMp(s => s.isFullscreen)

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

## React Three Fiber

⚛️ **`@manapotion/r3f`** includes a wrapper around R3F's `Canvas` that automatically enables WebGPU if supported.

```jsx
import { Canvas } from '@manapotion/r3f'

const App = () => <Canvas forceWebGL={false}>{/* Your scene */}</Canvas>
```

👉 Due to how Three.js' WebGPURenderer is written, your bundler must support **top-level await** ([Vite example](https://github.com/verekia/manapotion/blob/main/examples/react/vite.config.ts)).

To know if your canvas is currently using WebGPU or WebGL, you can use `useThree` inside the canvas:

```jsx
const Scene = () => {
  const gl = useThree(s => s.gl)

  console.log(gl.isWebGLRenderer)
  console.log(gl.isWebGPURenderer)

  // ...
}
```

For a canvas that takes up the entire screen and resizes nicely on mobile, you can use:

```css
html {
  height: 100dvh;
}

body,
#root {
  height: 100%;
}
```

With Tailwind:

```html
<html class="h-dvh">
  <body class="h-full">
    <div id="root" class="h-full"><!-- App --></div>
  </body>
</html>
```

There are also hooks available to run logic inside the main R3F `requestAnimationFrame` loop. They are simple hooks around [`addEffect`, `addAfterEffect`, and `addTail`](https://docs.pmnd.rs/react-three-fiber/api/additional-exports). See R3F [loop source](https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/core/loop.ts).

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

# Utilities

🛠 **`@manapotion/util`** provides a few utility functions that are useful for JS gamedev in general.

- `lerp`: Linear interpolation.
- `clamp`: Clamps a number between a minimum and a maximum value.
- `throttle`: Throttles a function by a given time in ms.
- `debounce`: Debounces a function by a given time in ms.
- `throttleDebounce`: Throttles a function by a given time in ms, but also makes a final call to it after the throttle time has passed.

## Math

The following `Math` properties and methods are available as named exports, so you don't have to type `Math.` every time:

```js
export const pi = Math.PI
export const sin = Math.sin
export const cos = Math.cos
export const abs = Math.abs
export const sqrt = Math.sqrt
export const pow = Math.pow
export const atan2 = Math.atan2
export const round = Math.round
export const floor = Math.floor
export const ceil = Math.ceil
export const max = Math.max
export const min = Math.min
```

# Tailwind

🍃 **`@manapotion/tailwind`** is a package that needs to be installed separately and provides a theme containing the following `screens` breakpoints:

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

## Contributing

See the [contributing guide](https://github.com/verekia/manapotion/blob/main/CONTRIBUTING.md).

## License

MIT

## Author

Created by [@verekia](https://twitter.com/verekia) for 🔮 [MiniMana.io](https://minimana.io/)

Visit 🌐 [WebGameDev.com](https://webgamedev.com/) and [join the Web Game Dev](https://webgamedev.com/discord) community.
