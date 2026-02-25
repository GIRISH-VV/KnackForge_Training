import { useMemo, useState } from 'react'
import './common.css'

function UseMemoExample() {
  const [number, setNumber] = useState(1)
  const [count, setCount] = useState(0)

  const squaredValue = useMemo(() => {
    return number * number
  }, [number])
  
  return (
    <div className="hook-container">
      <h1 className="hook-title">useMemo</h1>
      <p className="hook-text">Number: {number}</p>
      <p className="hook-text">Memoized square: {squaredValue}</p>
      <div className="hook-row">
        <button className="hook-button" onClick={() => setNumber((prev) => prev + 1)}>
          Increase Number
        </button>
        <button className="hook-button" onClick={() => setCount((prev) => prev + 1)}>
          Re-render: {count}
        </button>
      </div>
    </div>
  )
}

export default UseMemoExample
