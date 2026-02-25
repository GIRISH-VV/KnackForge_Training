import { memo, useCallback, useState } from 'react'
import './common.css'

const ChildButton = memo(function ChildButton({ onClick }) {
  return (
    <button className="hook-button" onClick={onClick}>
      Increase Number
    </button>
  )
})

function UseCallbackExample() {
  const [number, setNumber] = useState(0)
  const [count, setCount] = useState(0)

  const incrementNumber = useCallback(() => {
    setNumber((prev) => prev + 1)
  }, [])

  return (
    <div className="hook-container">
      <h1 className="hook-title">useCallback</h1>
      <p className="hook-text">Number: {number}</p>
      <p className="hook-text">Parent count: {count}</p>
      <div className="hook-row">
        <ChildButton onClick={incrementNumber} />
        <button className="hook-button" onClick={() => setCount((prev) => prev + 1)}>
          Re-render Parent
        </button>
      </div>
    </div>
  )
}

export default UseCallbackExample
