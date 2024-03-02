import { useRef, useState } from 'react'

import { MeshProps, useFrame } from '@react-three/fiber'
import {
  BrowserEvents,
  Canvas,
  enterFullscreen,
  exitFullscreen,
  lockKeys,
  lockOrientation,
  lockPointer,
  unlockKeys,
  unlockOrientation,
  useBrowserStore,
} from '@v1v2/engine'
import { Mesh } from 'three'

import RendererInfo from '#/components/RendererInfo'

function Box(props: MeshProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((_, delta) => (meshRef.current!.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const App = () => {
  const [renderer, setRenderer] = useState('WebGPU')
  const toggleRenderer = () => setRenderer(renderer === 'WebGPU' ? 'WebGL' : 'WebGPU')
  const isFullscreen = useBrowserStore(s => s.isFullscreen)
  const isPageVisible = useBrowserStore(s => s.isPageVisible)
  const isPointerLocked = useBrowserStore(s => s.isPointerLocked)
  const width = useBrowserStore(s => s.width)
  const height = useBrowserStore(s => s.height)

  return (
    <>
      <div className="space-x-2 absolute z-10">
        <h1 className="text-center">V1V2 Engine</h1>
        <div>
          <h2>Fullscreen: {isFullscreen ? 'Yes' : 'No'}</h2>
          <button
            className="bg-slate-100 rounded-md px-2 py-1"
            onClick={isFullscreen ? exitFullscreen : enterFullscreen}
          >
            Toggle Fullscreen
          </button>
        </div>
        <div>
          <h2>Orientation (use after fullscreen on mobile)</h2>
          <button
            className="bg-slate-100 rounded-md px-2 py-1"
            onClick={() => lockOrientation('landscape')}
          >
            Landscape
          </button>
          <button
            className="bg-slate-100 rounded-md px-2 py-1"
            onClick={() => lockOrientation('portrait')}
          >
            Portrait
          </button>
          <button className="bg-slate-100 rounded-md px-2 py-1" onClick={unlockOrientation}>
            Unlock orientation
          </button>
        </div>
        <div>
          <h2>Keyboard lock (use after fullscreen on desktop)</h2>
          <button
            className="bg-slate-100 rounded-md px-2 py-1"
            onClick={() => lockKeys(['Escape'])}
          >
            Lock Esc
          </button>
          <button className="bg-slate-100 rounded-md px-2 py-1" onClick={() => unlockKeys()}>
            Release Esc
          </button>
        </div>
        <div>
          <h2>Pointer is locked: {isPointerLocked ? 'Yes' : 'No'}</h2>
          <button className="bg-slate-100 rounded-md px-2 py-1" onClick={lockPointer}>
            Lock pointer
          </button>
        </div>
        <div>Page is visible: {isPageVisible ? 'Yes' : 'No'}</div>
        <div>
          Size: {width}x{height}
        </div>
      </div>
      <RendererInfo toggleRenderer={toggleRenderer} />
      <Canvas forceWebGL={renderer === 'WebGL' || Boolean(import.meta.env.VITE_FORCE_WEBGL)}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <BrowserEvents />
    </>
  )
}

export default App
