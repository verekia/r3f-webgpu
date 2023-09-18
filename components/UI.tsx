import Stats from './Stats'

const UI = ({
  isWebGPUAvailable,
  isWebGPU,
  setIsReady,
  setIsWebGPU,
  extraBoxCount,
  setExtraBoxCount,
}) => (
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
      <div>
        <label>
          <input
            type="number"
            value={extraBoxCount}
            onChange={e => setExtraBoxCount(Number(e.target.value))}
          />
          Extra boxes
        </label>
      </div>
    </div>
    <Stats />
  </>
)

export default UI
