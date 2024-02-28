import { useThree } from '@react-three/fiber'

import useCanvasStore from './stores/useCanvasStore'

const RendererDetector = () => {
  const { gl } = useThree()
  const rendererName = useCanvasStore(s => s.rendererName)

  // @ts-expect-error
  if (gl.isWebGPURenderer && rendererName !== 'WebGPU') {
    useCanvasStore.getState().setRendererName('WebGPU')
  }

  // @ts-expect-error
  if (gl.isWebGLRenderer && rendererName !== 'WebGL') {
    useCanvasStore.getState().setRendererName('WebGL')
  }

  return null
}

export default RendererDetector
