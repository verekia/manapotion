import { useEffect, useState } from 'react'

import { Canvas as R3FCanvas, useThree, CanvasProps } from '@react-three/fiber'
import useStore from './store'

let WebGPURenderer: any

const RendererDetector = () => {
  const { gl } = useThree()
  const rendererName = useStore(s => s.rendererName)

  // @ts-expect-error
  if (gl.isWebGPURenderer && rendererName !== 'WebGPU') {
    useStore.getState().setRendererName('WebGPU')
  }

  // @ts-expect-error
  if (gl.isWebGLRenderer && rendererName !== 'WebGL') {
    useStore.getState().setRendererName('WebGL')
  }

  return null
}

const Canvas = ({ children, forceWebGL, ...props }: CanvasProps & { forceWebGL?: boolean }) => {
  const [isWebGPUAvailable, setIsWebGPUAvailable] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const fn = async () => {
      if (forceWebGL) {
        setIsReady(true)
        return
      }
      // @ts-ignore
      const capabilities = (await import('three/addons/capabilities/WebGPU.js')).default
      // @ts-ignore
      WebGPURenderer = (await import('three/addons/renderers/webgpu/WebGPURenderer.js')).default
      setIsWebGPUAvailable(capabilities.isAvailable())
      setIsReady(true)
    }
    fn()
  }, [])

  return (
    isReady && (
      <R3FCanvas
        dpr={[1, 1.5]}
        {...(isWebGPUAvailable && {
          gl: canvas => {
            const r = new WebGPURenderer({ canvas })
            r.setClearColor(0x000000, 0)
            r.xr = { addEventListener: () => {} }
            return r
          },
        })}
        {...props}
      >
        {children}
        <RendererDetector />
      </R3FCanvas>
    )
  )
}

export default Canvas
