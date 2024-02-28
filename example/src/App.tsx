import { useRef, useState } from 'react'

import { MeshProps, useFrame } from '@react-three/fiber'
import Canvas from '@v1v2/engine/src/Canvas'
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

  return (
    <>
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
    </>
  )
}

export default App
