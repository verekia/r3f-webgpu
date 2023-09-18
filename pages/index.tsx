import { useEffect, useState } from 'react'

import { Canvas, useThree } from '@react-three/fiber'

import Box from '../components/Box'
import Stats from '../components/Stats'

const Scene = () => {
  const { gl } = useThree()

  useEffect(() => {
    console.log(gl)
  }, [])

  return (
    <>
      <ambientLight intensity={5} />
      <Box position-x={-1.2} />
      <Box position-x={1.2} />
    </>
  )
}

let WebGPURenderer

const IndexPage = () => {
  const [isWebGPUAvailable, setIsWebGPUAvailable] = useState(false)
  const [isWebGPU, setIsWebGPU] = useState(false)
  const [isReady, setIsReady] = useState(false)

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
      <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1 }}>
        <div>{isWebGPUAvailable ? 'WebGPU supported' : 'WebGPU not supported'}</div>
        <label>
          <input
            type="checkbox"
            checked={isWebGPU}
            onChange={e => {
              setIsReady(false)
              setIsWebGPU(e.target.checked)
              // This is to fully unmount the canvas, because for some reason
              // it seems like it gets reused when switching between WebGL and WebGPU.
              // Maybe due to some optimization in R3F?
              setTimeout(() => setIsReady(true), 500)
            }}
          />
          WebGPU
        </label>
      </div>
      <Stats />
      {isReady && (
        <Canvas
          {...(isWebGPU && {
            gl: canvas => {
              if (!WebGPURenderer) {
                throw Error('WebGPU renderer not loaded')
              }
              const r = new WebGPURenderer({ canvas })
              r.setClearColor(0x000000, 0)
              r.xr = { addEventListener: () => {} }
              return r
            },
          })}
        >
          <Scene />
        </Canvas>
      )}
    </>
  )
}

export default IndexPage
