import { useEffect, useRef, useState } from 'react'

import { Canvas as R3FCanvas, CanvasProps } from '@react-three/fiber'

let WebGPURenderer: any

export const Canvas = ({
  children,
  forceWebGL = false,
  ...props
}: CanvasProps & { forceWebGL?: boolean }) => {
  const [isWebGPU, setIsWebGPU] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const previousForceWebGLRef = useRef(forceWebGL)

  useEffect(() => {
    const loadWebGPU = async () => {
      if (!forceWebGL) {
        const capabilities = (await import('three/addons/capabilities/WebGPU.js')).default
        WebGPURenderer = (await import('three/addons/renderers/webgpu/WebGPURenderer.js')).default
        setIsWebGPU(capabilities.isAvailable())
        setIsReady(true)
      }
    }

    // This is to fully unmount the canvas and remount it, otherwise the renderer won't change
    if (previousForceWebGLRef.current !== forceWebGL) {
      setIsReady(false)
      if (forceWebGL) {
        setTimeout(() => setIsReady(true), 0)
      }
      previousForceWebGLRef.current = forceWebGL
    }

    if (!forceWebGL) {
      loadWebGPU()
    }
  }, [forceWebGL])

  if (!isReady) return null

  return (
    <R3FCanvas
      dpr={[1, 1.5]}
      {...(isWebGPU &&
        !forceWebGL && {
          gl: canvas => {
            const r = new WebGPURenderer({ canvas })
            // Note: WebGPURenderer also does have a forceWebGL parameter and falls back to WebGL if WebGPU is not available
            r.setClearColor(0x000000, 0)
            r.xr = { addEventListener: () => {} }
            // From https://github.com/Lunakepio/Mario-Kart-3.js/blob/main/src/App.jsx
            // gl={{ antialias: false, stencil: false, depth:false, powerPreference: 'high-performance' }}
            // mode="concurrent"
            return r
          },
        })}
      {...props}
    >
      {children}
    </R3FCanvas>
  )
}
