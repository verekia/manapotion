import { useEffect } from 'react'

import { useThree } from '@react-three/fiber'

import { getCanvasState } from './stores/canvas-store'

const RendererDetector = () => {
  const gl = useThree(s => s.gl)

  useEffect(() => {
    const { rendererName, setRendererName } = getCanvasState()

    if (gl) {
      // @ts-expect-error
      if (gl.isWebGPURenderer && rendererName !== 'WebGPU') {
        setRendererName('WebGPU')
      }

      // @ts-expect-error
      if (gl.isWebGLRenderer && rendererName !== 'WebGL') {
        setRendererName('WebGL')
      }
    }
  }, [gl])

  return null
}

export default RendererDetector
