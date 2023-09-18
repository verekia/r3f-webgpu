import { useRef, useState } from 'react'

import { useTexture } from '@react-three/drei'
import { useFrame, type MeshProps } from '@react-three/fiber'

import type { Mesh } from 'three'

const Box = (props: MeshProps) => {
  const meshRef = useRef<Mesh>()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // const texture = useTexture('/cat.jpg')

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
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /* map={texture} */ />
    </mesh>
  )
}

export default Box
