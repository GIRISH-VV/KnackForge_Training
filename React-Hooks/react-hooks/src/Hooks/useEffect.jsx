import { useEffect, useState } from 'react'
import './common.css'

function UseEffectExample() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`Count: ${count}`)
  }, [count])

  return (
    <div className="hook-container">
      <h1 className="hook-title">useEffect</h1>
      <p className="hook-text">You clicked {count} times.</p>
      <button className="hook-button" onClick={() => setCount(count + 1)}>
        Increase Count
      </button>
    </div>
  )
}

export default UseEffectExample
