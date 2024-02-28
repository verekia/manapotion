# 🏎 V1V2 Engine

Do not use, unless you are me.

TS and React only. The TypeScript React files are not even compiled. If your project uses different `tsconfig.json` settings than what the library expects, it might break. It is based on Vite's tsconfig.

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

# Utils

A few utilities are included:

- `lerp`
- `clamp`
- `pi`
