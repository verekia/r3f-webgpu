import { useRef, useState } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'

import type { MeshProps } from '@react-three/fiber'
import type { Mesh } from 'three'

const Box = (props: MeshProps) => {
  const meshRef = useRef<Mesh>()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((_, dt) => (meshRef.current.rotation.x += dt))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const IndexPage = () => {
  const [isWebGPU, setIsWebGPU] = useState(false)

  return (
    <>
      <label style={{ position: 'fixed', top: 0, right: 0, zIndex: 1 }}>
        <input type="checkbox" checked={isWebGPU} onChange={e => setIsWebGPU(e.target.checked)} />
        WebGPU
      </label>
      <Canvas>
        <ambientLight intensity={5} />
        <Box position-x={-1.2} />
        <Box position-x={1.2} />
      </Canvas>
    </>
  )
}

export default IndexPage
