# 🏎 V1V2 Engine

This is a work-in-progress collection of utilities and components to make [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) and React game development easier.

🛑 Do not use, unless you are me.

TS and React only. The TypeScript React files are not even compiled at the moment. If your project uses different `tsconfig.json` settings than what the library expects, it might break. It is based on Vite's tsconfig.

## Features

- [WebGPU Canvas](#webgpu-canvas)
- [Browser Events](#browser-events)
- [Utils](#utils)

## Installation

```sh
npm install @v1v2/engine
yarn add @v1v2/engine
pnpm add @v1v2/engine
bun add @v1v2/engine
```

## WebGPU Canvas

Wrapper around R3F's `Canvas` that automatically enables WebGPU if supported.

```jsx
import { Canvas } from '@v1v2/engine'

const App = () => <Canvas forceWebGL={false}>{/* Your scene */}</Canvas>
```

👉 Due to the way Three.js' WebGPURenderer is written, your bundler must support **top-level await** ([Vite example](https://github.com/verekia/v1v2-engine/blob/main/example/vite.config.ts)).

If you want to show an indicator that the canvas is currently using WebGPU, you can use `useCanvasStore`:

```jsx
import { useCanvasStore } from '@v1v2/engine'

const RendererIndicator = () => {
  const rendererName = useCanvasStore(s => s.rendererName)

  return <div>{rendererName}</div>
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

## Browser Events

Add `<BrowserEvents>` to your app anywhere to listen and bind the following events to the reactive `useBrowserStore` values:

- `fullscreenchange` => `isFullscreen`
- `visibilitychange` => `isPageVisible`
- `pointerlockchange` => `isPointerLocked`
- `resize` => `width` and `height`
- `window.matchMedia('(hover: hover)').matches` => `canHover`

Some helpers to abstract the browser's API are also included:

- `enterFullscreen`
- `exitFullscreen`
- `lockOrientation`
- `unlockOrientation`
- `lockPointer`
- `unlockPointer`
- `lockKeys`
- `unlockKeys`

Combine the functionalities above this way:

```jsx
import { BrowserEvents, useBrowserStore, enterFullscreen, exitFullscreen } from '@v1v2/engine'

const App = () => {
  const isFullscreen = useBrowserStore(s => s.isFullscreen) // Reactive

  return (
    <>
      <button onClick={isFullscreen ? exitFullscreen : enterFullscreen}>
        {isFullscreen ? 'Fullscreen' : 'Not fullscreen'}
      </button>
      <BrowserEvents
        // Event callbacks
        onPointerLockChange={isPointerLocked => console.log(isPointerLocked)}
      />
    </>
  )
}
```

If you want to access any store's value outside of a component's lifecycle, you can use `getBrowserState`:

```jsx
import { getBrowserState } from '@v1v2/engine'

const myMainUpdateLoop = () => {
  const isFullscreen = getBrowserState().isFullscreen
  // ...
}
```

For a fully immersive experience of an FPS game for example, when the player clicks Play or the Fullscreen button, you might want to call multiple helpers in a row like this:

```jsx
<button
  onClick={() => {
    enterFullscreen()
    lockOrientation('landscape') // This will only affect mobile
    lockPointer() // This will only affect desktop
    lockKeys(['Escape']) // This will only affect desktop
  }}
>
  Play
</button>
```

**Note**: Locking keys is a [Chrome experimental feature](https://developer.chrome.com/blog/better-full-screen-mode) to maintain fullscreen when players press Esc (they have to hold it instead). It lets games show in-game dialogs that players can close with Esc without leaving fullscreen.

# Utils

A few utilities are included:

- `lerp`: Linear interpolation.
- `clamp`: Clamps a number between a minimum and a maximum value.
- `pi`: A less verbose `Math.PI`.
- `throttle`: Throttles a function by a given time in ms.
- `debounce`: Debounces a function by a given time in ms.
- `throttleDebounce`: Throttles a function by a given time in ms, but also makes a final call to it after the throttle time has passed.
