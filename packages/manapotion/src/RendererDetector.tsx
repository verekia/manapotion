import { useEffect } from 'react'

import { useThree } from '@react-three/fiber'

import { engine } from './store'

const RendererDetector = () => {
  const gl = useThree(s => s.gl)

  useEffect(() => {
    const { rendererName, setRendererName } = engine()

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
