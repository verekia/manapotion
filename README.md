<h1 align="center">Mana Potion</h1>

<p align="center">
  <img src="/example/public/mana-potion.webp" alt="Mana Potion" width="162" height="230" />
</p>

Mana Potion is a 🚧 **work-in-progress** 🚧 toolkit to make web game development easier. It is currently mainly aimed at React and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) projects, but it can be used in non-React projects as well.

## Installation

Mana Potion consists of:

- [**`@manapotion/react`**](#react-listeners-store-and-hooks): React listeners, store, and hooks
- [**`@manapotion/browser`**](#browser-api-helpers): Browser API helpers
- [**`@manapotion/r3f`**](#react-three-fiber): React Three Fiber WebGPU canvas
- [**`@manapotion/util`**](#utilities): General gamedev utilities
- **`manapotion`**: All of the above in one package that exports everything

If you are making a React Three Fiber game, the easiest option is to add `manapotion` to your project:

```sh
# NPM
npm install manapotion
# Yarn
yarn add manapotion
# PNPM
pnpm add manapotion
# Bun
bun add manapotion
```

For React projects that don't use R3F, non-React projects, or if you are not interested in all of the features of Mana Potion, install the packages that are relevant to you independently. For example:

```sh
# NPM
npm install @manapotion/react @manapotion/browser
# Yarn
yarn add @manapotion/react @manapotion/browser
# PNPM
pnpm add @manapotion/react @manapotion/browser
# Bun
bun add @manapotion/react @manapotion/browser
```

## React Listeners, Store, and Hooks

⚛️ **`@manapotion/react`** is the main package of Mana Potion. It contains listeners that update a reactive store which you can use as a hook in your components or access directly in your imperative code.

The listeners available are:

- `<MouseDownListener />`
- `<MouseMoveListener />`
- `<MouseScrollListener />`
- `<KeyboardListener />`
- `<PointerLockListener />`
- `<FullscreenChangeListener />`
- `<ResizeListener />`
- `<CanHoverListener />`
- `<PageVisibilityListener />`
- `<PageFocusListener />`

To enable them all, simply add `<Listeners />` to your app:

```jsx
import { Listeners } from '@manapotion/react'
// or
// import { Listeners } from 'manapotion

const App = () => (
  <>
    <div>Your game</div>
    <Listeners />
  </>
)
```

Access reactive variables with the `useMP` hook. It is a [Zustand](https://github.com/pmndrs/zustand) store, so you must pass a selector to it:

```jsx
import { useMP } from 'manapotion'

const Header = () => {
  const isFullscreen = useMP(s => s.isFullscreen)

  return <div>{isFullscreen ? 'You are fullscreen' : 'You are not fullscreen'}</div>
}
```

If you need to access the state outside of a component's lifecycle, you can use `mp()`:

```jsx
import { mp } from 'manapotion'

const myMainUpdateLoop = () => {
  const { isRightMouseDown } = mp()
  // ...
}
```

Some variables that update very frequently such as mouse position are available in two flavors:

- Reactive but throttled via `useMP` for when you want to trigger React re-renders.
- Non-reactive but always up-to-date via `mp` to use in your animation loops:

```jsx
const Camera = () => {
  useFrame(() => {
    const { mouseMovementX, mouseMovementY } = mp()
    // ...
  })
  // ...
}
```

Here is the list of available variables. Variables that are both reactive and non-reactive are marked with a ⚡️.

### 🌐 General browser state

- `isPointerLocked`
- `isFullscreen`
- `isPageVisible`
- `isPageFocused`
- `canHover` (you can think of it as "is desktop". Mobile and touch devices will return `false`.)
- ⚡️ `width` (of the window)
- ⚡️ `height` (of the window)

### 🕹 Inputs

- `isLeftMouseDown`
- `isMiddleMouseDown`
- `isRightMouseDown`
- `keys`
- ⚡️ `mouseX`
- ⚡️ `mouseY` (the bottom of the screen is 0)
- ⚡️ `mouseMovementX`
- ⚡️ `mouseMovementY` (going up is positive)
- ⚡️ `mouseWheelDeltaY`
- 🚧 Coming soon: Gamepads

### Callbacks

You can provide custom event callbacks to `<Listeners />`.

```jsx
<Listeners onPointerLockChange={isPointerLocked => console.log(isPointerLocked)} />
```

### Keys

Keyboard `keys` are available in two versions,`keys.byCode` and `keys.byKey`. This lets you decide if you want to use the [physical location](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard_API#writing_system_keys) (`byCode`) of the key or the character being typed as a key (`byKey`). Using the physical location is better for game controls such as using WASD to move a character, because it is agnostic to the user's keyboard layout (did you know French keyboards are not QWERTY but AZERTY?).

Here is how you would handle going forward when the user presses W (or Z on French keyboards):

```js
const myMainLoop = () => {
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

### Hooks

- `useUIFrame` or `useAnimationFrame` (alias): Like R3F's [`useFrame`](https://docs.pmnd.rs/react-three-fiber/api/hooks#useframe) but for your UI updates. It will execute your callback at every frame without being tied to React's rendering cycle.

```jsx
const HealthBar = () => {
  const ref = useRef()

  useUIFrame(() => {
    ref.current.textContent = `Health: ${entity.health}%`
  })

  return <div ref={ref} />
}
```

### Augmenting the store

You can add your own variables to the store by augmenting the `CustomSlice` interface from `@manapotion/react` or from `manapotion` in a global definition file such as `global.d.ts` at the root of your project:

```ts
import '@manapotion/react'

declare module '@manapotion/react' {
  interface CustomSlice {
    joystick: { angle?: number; force?: number }
  }
}
```

You can then set it imperatively as `mp().joystick = joystickData` or reactively with `mp().setCustom('joystick', joystickData)`.

## Browser API Helpers

🌐 **`@manapotion/browser`** provides helper functions to abstract some browser APIs:

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

const FullscreenButton = () => (
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
```

**Note**: Locking keys is a [Chrome experimental feature](https://developer.chrome.com/blog/better-full-screen-mode) to maintain fullscreen when players press Esc (they have to hold it instead). It lets games show in-game dialogs that players can close with Esc without leaving fullscreen.

## React Three Fiber

⚛️ **`@manapotion/r3f`** currently includes a single component: a wrapper around R3F's `Canvas` that automatically enables WebGPU if supported.

```jsx
import { Canvas } from '@manapotion/r3f'

const App = () => <Canvas forceWebGL={false}>{/* Your scene */}</Canvas>
```

👉 Due to the way Three.js' WebGPURenderer is written, your bundler must support **top-level await** ([Vite example](https://github.com/verekia/manapotion/blob/main/example/vite.config.ts)).

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

# Utilities

🛠 **`@manapotion/util`** provides a few utility functions that are useful for JS gamedev in general.

- `lerp`: Linear interpolation.
- `clamp`: Clamps a number between a minimum and a maximum value.
- `throttle`: Throttles a function by a given time in ms.
- `debounce`: Debounces a function by a given time in ms.
- `throttleDebounce`: Throttles a function by a given time in ms, but also makes a final call to it after the throttle time has passed.
- `pi`: A less verbose `Math.PI`.

## License

MIT

## Author

Created by [@verekia](https://twitter.com/verekia) for 🔮 [MiniMana.io](https://minimana.io/)

Visit 🌐 [WebGameDev.com](https://webgamedev.com/) and [join the Web Game Dev](https://webgamedev.com/discord) community.
