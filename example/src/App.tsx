import { useRef, useState } from 'react'

import { MeshProps, useFrame } from '@react-three/fiber'
import {
  Canvas,
  debounce,
  enterFullscreen,
  exitFullscreen,
  Listeners,
  lockKeys,
  lockOrientation,
  lockPointer,
  mp,
  throttle,
  throttleDebounce,
  unlockKeys,
  unlockOrientation,
  useFrameEffect,
  useMP,
} from 'manapotion'
import { Mesh } from 'three'

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

export const throttledHello = throttle(
  (...args: any[]) => console.log('throttledHello', ...args),
  1000,
)
export const debouncedHello = debounce(
  (...args: any[]) => console.log('debouncedHello', ...args),
  1000,
)
export const throttledDebouncedHello = throttleDebounce(
  (...args: any[]) => console.log('throttledDebouncedHello', ...args),
  1000,
)

const App = () => {
  const [renderer, setRenderer] = useState('WebGPU')
  const toggleRenderer = () => setRenderer(renderer === 'WebGPU' ? 'WebGL' : 'WebGPU')
  const isFullscreen = useMP(s => s.isFullscreen)
  const isPageVisible = useMP(s => s.isPageVisible)
  const isPageFocused = useMP(s => s.isPageFocused)
  const isPointerLocked = useMP(s => s.isPointerLocked)
  const isDesktop = useMP(s => s.isDesktop)
  const isMobile = useMP(s => s.isMobile)
  const isPortrait = useMP(s => s.isPortrait)
  const isLandscape = useMP(s => s.isLandscape)
  const isLeftMouseDown = useMP(s => s.isLeftMouseDown)
  const isMiddleMouseDown = useMP(s => s.isMiddleMouseDown)
  const isRightMouseDown = useMP(s => s.isRightMouseDown)
  const keys = useMP(s => s.keys)

  const liveMouseXRef = useRef<HTMLSpanElement>(null)
  const liveMouseYRef = useRef<HTMLSpanElement>(null)
  const liveMouseMovementXRef = useRef<HTMLSpanElement>(null)
  const liveMouseMovementYRef = useRef<HTMLSpanElement>(null)

  const liveWidthRef = useRef<HTMLSpanElement>(null)
  const liveHeightRef = useRef<HTMLSpanElement>(null)

  const liveScrollYRef = useRef<HTMLDivElement>(null)

  useFrameEffect(() => {
    liveMouseXRef.current!.textContent = String(mp().mouseX)
    liveMouseYRef.current!.textContent = String(mp().mouseY)
    liveMouseMovementXRef.current!.textContent = String(mp().mouseMovementX)
    liveMouseMovementYRef.current!.textContent = String(mp().mouseMovementY)
    liveWidthRef.current!.textContent = String(mp().windowWidth)
    liveHeightRef.current!.textContent = String(mp().windowHeight)
    liveScrollYRef.current!.textContent = String(mp().mouseWheelDeltaY)
  })

  return (
    <>
      <div className="space-x-2 absolute z-10">
        <h1 className="text-center">Mana Potion</h1>
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
            onClick={() => lockKeys(['Escape', 'KeyW', 'KeyA', 'KeyS', 'KeyD'])}
          >
            Lock Esc and WASD
          </button>
          <button className="bg-slate-100 rounded-md px-2 py-1" onClick={() => unlockKeys()}>
            Release keys
          </button>
        </div>
        <div>
          <h2>Pointer is locked: {isPointerLocked ? 'Yes' : 'No'}</h2>
          <button className="bg-slate-100 rounded-md px-2 py-1" onClick={lockPointer}>
            Lock pointer
          </button>
        </div>
        <div>Page is visible: {isPageVisible ? 'Yes' : 'No'}</div>
        <div>Page is focused: {isPageFocused ? 'Yes' : 'No'}</div>
        <div>
          <b>Mouse buttons</b>
        </div>
        <div>Left: {isLeftMouseDown ? 'Yes' : 'No'} </div>
        <div>Middle: {isMiddleMouseDown ? 'Yes' : 'No'} </div>
        <div>Right: {isRightMouseDown ? 'Yes' : 'No'} </div>
        <div>
          Window size: <span ref={liveWidthRef} />x<span ref={liveHeightRef} />
        </div>
        <div>Is desktop: {isDesktop ? 'Yes' : 'No'}</div>
        <div>Is mobile: {isMobile ? 'Yes' : 'No'}</div>
        <div>Is portrait: {isPortrait ? 'Yes' : 'No'}</div>
        <div>Is landscape: {isLandscape ? 'Yes' : 'No'}</div>
        <div>
          Mouse position: <span ref={liveMouseXRef} /> <span ref={liveMouseYRef} />
        </div>
        <div>
          Mouse movement: <span ref={liveMouseMovementXRef} /> <span ref={liveMouseMovementYRef} />
        </div>
        <div>
          Mouse wheel delta Y: <span ref={liveScrollYRef} />
        </div>
        <div>
          <div>
            <b>Keyboard</b>
          </div>
          <textarea readOnly className="w-[500px] h-[100px]" value={JSON.stringify(keys)} />
        </div>
      </div>
      <div className="5xs:bg-green-500 4xs:bg-blue-500 3xs:bg-orange-500 2xs:bg-yellow-500 xs:bg-purple-500 3xl:bg-purple-500 4xl:bg-yellow-500 5xl:bg-pink-500  absolute top-0 right-0 z-10 rounded-bl-xl bg-red-500 px-5 py-2 text-white sm:bg-indigo-500 md:bg-red-500 lg:bg-green-500 xl:bg-blue-500 2xl:bg-orange-500">
        Tailwind
      </div>
      <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 transform">
        {renderer}
        <button className="bg-slate-100 rounded-md px-2 py-1 ml-2" onClick={toggleRenderer}>
          Change
        </button>
      </div>
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
      <Listeners
        onPointerLockChange={isPointerLocked => console.log('isPointerLocked', isPointerLocked)}
        mouseMovementResetDelay={100}
        onKeydown={keyState => console.log(keyState)}
      />
    </>
  )
}

export default App
