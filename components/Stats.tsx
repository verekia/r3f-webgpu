import { useEffect, useState } from 'react'

import { Stats as DreiStats } from '@react-three/drei'

// This is a wrapper to make Stats SSR-compatible.
const Stats = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <DreiStats className="stats" /> : null
}

export default Stats
