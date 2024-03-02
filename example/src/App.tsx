import { useCallback, useRef, useState } from 'react'

import { MeshProps, useFrame } from '@react-three/fiber'
import {
  Canvas,
  Engine,
  enterFullscreen,
  exitFullscreen,
  live,
  lockKeys,
  lockOrientation,
  lockPointer,
  unlockKeys,
  unlockOrientation,
  useEngine,
  useUIFrame,
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
  const isFullscreen = useEngine(s => s.isFullscreen)
  const isPageVisible = useEngine(s => s.isPageVisible)
  const isPointerLocked = useEngine(s => s.isPointerLocked)
  const width = useEngine(s => s.width)
  const height = useEngine(s => s.height)
  const canHover = useEngine(s => s.canHover)
  const mouseX = useEngine(s => s.mouseX)
  const mouseY = useEngine(s => s.mouseY)
  const mouseMovementX = useEngine(s => s.mouseMovementX)
  const mouseMovementY = useEngine(s => s.mouseMovementY)
  const isLeftMouseDown = useEngine(s => s.isLeftMouseDown)
  const isMiddleMouseDown = useEngine(s => s.isMiddleMouseDown)
  const isRightMouseDown = useEngine(s => s.isRightMouseDown)

  const liveMouseXRef = useRef<HTMLSpanElement>(null)
  const liveMouseYRef = useRef<HTMLSpanElement>(null)
  const liveMouseMovementXRef = useRef<HTMLSpanElement>(null)
  const liveMouseMovementYRef = useRef<HTMLSpanElement>(null)

  const liveWidthRef = useRef<HTMLSpanElement>(null)
  const liveHeightRef = useRef<HTMLSpanElement>(null)

  const handlePointerLockChange = useCallback(
    (isPointerLocked: boolean) => console.log(isPointerLocked),
    [],
  )

  useUIFrame(() => {
    liveMouseXRef.current!.textContent = String(live.mouseX)
    liveMouseYRef.current!.textContent = String(live.mouseY)
    liveMouseMovementXRef.current!.textContent = String(live.mouseMovementX)
    liveMouseMovementYRef.current!.textContent = String(live.mouseMovementY)
    liveWidthRef.current!.textContent = String(live.width)
    liveHeightRef.current!.textContent = String(live.height)
  })

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
        <div>Can hover: {canHover ? 'Yes' : 'No'}</div>
        <div>
          <b>Mouse buttons</b>
        </div>
        <div>Left: {isLeftMouseDown ? 'Yes' : 'No'} </div>
        <div>Middle: {isMiddleMouseDown ? 'Yes' : 'No'} </div>
        <div>Right: {isRightMouseDown ? 'Yes' : 'No'} </div>
        <div>
          <b>Window size</b>
        </div>
        <div>
          Live: <span ref={liveWidthRef} />x<span ref={liveHeightRef} />
        </div>
        <div>
          Reactive: {width}x{height}
        </div>
        <div>
          <b>Mouse position</b>
        </div>
        <div>
          Live: <span ref={liveMouseXRef} /> <span ref={liveMouseYRef} />
        </div>
        <div>
          Reactive: {mouseX} {mouseY}
        </div>
        <div>
          <b>Mouse movement</b>
        </div>
        <div>
          Live: <span ref={liveMouseMovementXRef} /> <span ref={liveMouseMovementYRef} />
        </div>
        <div>
          Reactive: {mouseMovementX} {mouseMovementY}
        </div>
      </div>
      <RendererInfo toggleRenderer={toggleRenderer} />
      <Canvas
        forceWebGL={renderer === 'WebGL' || Boolean(import.meta.env.VITE_FORCE_WEBGL)}
        onContextMenu={e => e.preventDefault()}
      >
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
      <Engine
        onPointerLockChange={handlePointerLockChange}
        reactiveMouseMoveThrottleDelay={200}
        mouseMovementResetDelay={100}
        reactiveResizeThrottleDelay={200}
      />
    </>
  )
}

export default App
