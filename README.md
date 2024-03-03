<h1 align="center">Mana Potion</h1>

<p align="center">
  <img src="/example/public/mana-potion.webp" alt="Mana Potion" width="150" height="150" />
</p>

This is a work-in-progress toolkit to make [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and React game development easier.

🛑 Do not use, unless you are me.

TS and React only. The TypeScript React files are not even compiled at the moment. If your project uses different `tsconfig.json` settings than what the library expects, it might break. It is based on Vite's tsconfig.

## Features

- [Browser Events](#browser-events)
- [WebGPU Canvas](#webgpu-canvas)
- [Utils](#utils)

## Installation

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

## Getting started

- Add `<ManaPotion />` to your app.

```jsx
import { ManaPotion } from 'manapotion'

const App = () => (
  <>
    <div>Your game</div>
    <ManaPotion />
  </>
)
```

## How to use

`<ManaPotion />` automatically listens to common browser events to give you access to both reactive and non-reactive variables, as well as event callbacks for custom logic.

Access reactive variables with the `useEngine` hook, and use [helper functions](#helpers) to trigger common browser events:

```jsx
import { useMana, usePotion enterFullscreen, exitFullscreen } from 'manapotion'

const FullscreenButton = () => {
  const isFullscreen = useMana(s => s.isFullscreen)
  const isFullscreen = usePotion(s => s.isFullscreen)

  if (mana().isFullscreen) {
    exitFullscreen()
  } else {
    enterFullscreen()
  }

  if (potion().isFullscreen) {
    exitFullscreen()
  } else {
    enterFullscreen()
  }


  return (
    <button onClick={isFullscreen ? exitFullscreen : enterFullscreen}>
      {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
    </button>
  )
}
```

If you need to access the state outside of a component's lifecycle, you can use `engine()`:

```jsx
import { engine } from 'manapotion'

const myMainUpdateLoop = () => {
  const { isRightMouseDown } = engine()
  // ...
}
```

Some variables that update very frequently such as mouse position are available in two flavors:

- Reactive but throttled via `useEngine` for when you want to trigger React re-renders.
- Non-reactive but always up-to-date via `engine` to use in your animation loops:

```jsx
const Camera = () => {
  useFrame(() => {
    const { mouseMovementX, mouseMovementY } = engine()
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
- `canHover` (you can think of it as "is desktop". Mobile and touch devices will return `false`.)
- ⚡️ `width` (of the window)
- ⚡️ `height` (of the window)

### 🕹 Inputs

- `isLeftMouseDown`
- `isMiddleMouseDown`
- `isRightMouseDown`
- ⚡️ `mouseX`
- ⚡️ `mouseY` (the bottom of the screen is 0)
- ⚡️ `mouseMovementX`
- ⚡️ `mouseMovementY` (going up is positive)

## `<ManaPotion />` callbacks

You can provide custom event callbacks to `<ManaPotion />`.

```jsx
<ManaPotion onPointerLockChange={isPointerLocked => console.log(isPointerLocked)} />
```

**Note to myself**: Check that making them stable with `useCallback` is not necessary.

## Helpers

Some helpers to abstract the browser's API are also included:

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
<button
  onClick={() => {
    if (isFullscreen) {
      exitFullscreen()
      unlockKeys()
      unlockOrientation()
    } else {
      enterFullscreen()
      lockOrientation('landscape')
      lockKeys(['Escape'])
    }
  }}
>
  Toggle fullscreen
</button>
```

**Note**: Locking keys is a [Chrome experimental feature](https://developer.chrome.com/blog/better-full-screen-mode) to maintain fullscreen when players press Esc (they have to hold it instead). It lets games show in-game dialogs that players can close with Esc without leaving fullscreen.

## WebGPU Canvas

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

Wrapper around R3F's `Canvas` that automatically enables WebGPU if supported.

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

# Utils

A few utilities are included:

- `lerp`: Linear interpolation.
- `clamp`: Clamps a number between a minimum and a maximum value.
- `pi`: A less verbose `Math.PI`.
- `throttle`: Throttles a function by a given time in ms.
- `debounce`: Debounces a function by a given time in ms.
- `throttleDebounce`: Throttles a function by a given time in ms, but also makes a final call to it after the throttle time has passed.

# Hooks

- `useUIFrame`: Like R3F `useFrame` but for your UI updates.
