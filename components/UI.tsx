const UI = ({ extraBoxCount, setExtraBoxCount }) => (
  <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 1 }}>
    <label>
      <input
        type="number"
        value={extraBoxCount}
        onChange={e => setExtraBoxCount(Number(e.target.value))}
      />
      Extra boxes
    </label>
  </div>
)

export default UI
