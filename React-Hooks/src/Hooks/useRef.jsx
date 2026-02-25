import { useEffect, useRef, useState } from 'react'
import './common.css'

function UseRefExample() {
  const inputRef = useRef(null)
  const renderCount = useRef(0)
  const [name, setName] = useState('')
  const [renderCountText, setRenderCountText] = useState(0)

  useEffect(() => {
    renderCount.current += 1
    setRenderCountText(renderCount.current)
  }, [name])

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="hook-container">
      <h1 className="hook-title">useRef</h1>
      <input
        ref={inputRef}
        className="hook-input"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Type your name"
      />
      <p className="hook-text">Value: {name || 'Empty'}</p>
      <p className="hook-text">Render count: {renderCountText}</p>
      <button className="hook-button" onClick={focusInput}>
        Focus Input
      </button>
    </div>
  )
}

export default UseRefExample
