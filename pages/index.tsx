import { useEffect, useState } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'

import Box from '../components/Box'
import UI from '../components/UI'

const Scene = ({ extraBoxCount }: { extraBoxCount: number }) => {
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
      {Array.from({ length: extraBoxCount }).map((_, i) => (
        <Box
          key={i}
          position-x={Math.random() * 10 - 5}
          position-y={Math.random() * 6 - 3}
          position-z={Math.random() * -10}
          castShadow
          receiveShadow
        />
      ))}
    </>
  )
}

let WebGPURenderer

const IndexPage = () => {
  const [isWebGPUAvailable, setIsWebGPUAvailable] = useState(false)
  const [isWebGPU, setIsWebGPU] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [extraBoxCount, setExtraBoxCount] = useState(0)

  useEffect(() => {
    const fn = async () => {
      // @ts-ignore
      const capabilities = (await import('three/addons/capabilities/WebGPU.js')).default
      // @ts-ignore
      WebGPURenderer = (await import('three/addons/renderers/webgpu/WebGPURenderer.js')).default
      setIsWebGPUAvailable(capabilities.isAvailable())
      setIsWebGPU(capabilities.isAvailable())
      setIsReady(true)
    }
    fn()
  }, [])

  return (
    <>
      <UI
        isWebGPUAvailable={isWebGPUAvailable}
        isWebGPU={isWebGPU}
        setIsReady={setIsReady}
        setIsWebGPU={setIsWebGPU}
        extraBoxCount={extraBoxCount}
        setExtraBoxCount={setExtraBoxCount}
      />
      {isReady && (
        <Canvas
          shadows
          {...(isWebGPU && {
            gl: canvas => {
              if (!WebGPURenderer) {
                throw Error('WebGPU renderer not loaded')
              }
              const r = new WebGPURenderer({ canvas })
              r.setClearColor(0xffffff, 20)
              r.xr = { addEventListener: () => {} }
              return r
            },
          })}
        >
          <Scene extraBoxCount={extraBoxCount} />
        </Canvas>
      )}
    </>
  )
}

export default IndexPage
