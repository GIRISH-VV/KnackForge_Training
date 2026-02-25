import { useReducer } from 'react'
import './common.css'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="hook-container">
      <h1 className="hook-title">useReducer</h1>
      <p className="hook-text">Count: {state.count}</p>
      <div className="hook-row">
        <button className="hook-button" onClick={() => dispatch({ type: 'decrement' })}>
          -1
        </button>
        <button className="hook-button" onClick={() => dispatch({ type: 'increment' })}>
          +1
        </button>
        <button className="hook-button" onClick={() => dispatch({ type: 'reset' })}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default UseReducerExample
