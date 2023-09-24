import { useEffect, useState } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'

import Box from '../components/Box'

const Scene = () => {
  const { gl } = useThree()

  useEffect(() => {
    console.log(gl)
  }, [])

  return (
    <>
      <directionalLight intensity={1} position={[0, 0, 1]} /* castShadow */ />
      <OrbitControls />
      <pointLight intensity={10} position={[1, 1, 1]} castShadow />
      <pointLight intensity={10} position={[-1, -1, -1]} castShadow />
      <pointLight intensity={10} position={[1, 0, -1]} castShadow />
      <pointLight intensity={10} position={[-1, 0, 1]} castShadow />
      <pointLight intensity={10} position={[0, 0, 2]} castShadow />
      <Box position-x={-1.2} castShadow receiveShadow />
      <Box position-x={1.2} castShadow receiveShadow />
    </>
  )
}

let WebGPURenderer

const IndexPage = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const fn = async () => {
      // @ts-ignore
      WebGPURenderer = (await import('three/addons/renderers/webgpu/WebGPURenderer.js')).default
      setIsReady(true)
    }
    fn()
  }, [])

  if (!isReady) {
    return null
  }

  return (
    <Canvas
      shadows
      gl={canvas => {
        if (!WebGPURenderer) {
          throw Error('WebGPU renderer not loaded')
        }
        const r = new WebGPURenderer({ canvas })
        r.setClearColor(0x000000, 0)
        r.xr = { addEventListener: () => {} }
        return r
      }}
    >
      <Scene />
    </Canvas>
  )
}

export default IndexPage
