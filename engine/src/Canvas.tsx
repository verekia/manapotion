import { ReactNode, useEffect, useRef, useState } from 'react'

import { Canvas as R3FCanvas, useThree } from '@react-three/fiber'
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

const Canvas = ({ children, forceWebGL }: { children?: ReactNode; forceWebGL?: boolean }) => {
  const [isWebGPUAvailable, setIsWebGPUAvailable] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const longRightClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

    return () => {
      longRightClickTimeoutRef.current && clearTimeout(longRightClickTimeoutRef.current)
    }
  }, [])

  return (
    isReady && (
      <R3FCanvas
        dpr={[1, 1.5]}
        className="top-0 z-0"
        style={{ position: 'absolute' }}
        onContextMenu={e => e.preventDefault()}
        onMouseMove={e => {
          // Note: This can cause many exceptions if the fullscreen is not allowed
          if (e.buttons === 2) {
            document.body.requestPointerLock()
            longRightClickTimeoutRef.current && clearTimeout(longRightClickTimeoutRef.current)
          }
        }}
        onMouseUp={e => {
          if (e.button === 2) {
            longRightClickTimeoutRef.current && clearTimeout(longRightClickTimeoutRef.current)
          }
        }}
        onMouseDown={e => {
          if (e.button === 2) {
            longRightClickTimeoutRef.current = setTimeout(() => {
              document.body.requestPointerLock()
            }, 300)
          }
        }}
        shadows
        {...(isWebGPUAvailable && {
          gl: canvas => {
            const r = new WebGPURenderer({ canvas })
            r.setClearColor(0x000000, 0)
            r.xr = { addEventListener: () => {} }
            return r
          },
        })}
      >
        {children}
        <RendererDetector />
      </R3FCanvas>
    )
  )
}

export default Canvas
