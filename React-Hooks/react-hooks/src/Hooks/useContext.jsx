import { createContext, useContext, useState } from 'react'
import './common.css'

const ThemeContext = createContext('light')

function ThemeMessage() {
  const theme = useContext(ThemeContext)

  return (
    <p className="hook-text">
      Current theme from context: <strong>{theme}</strong>
    </p>
  )
}

function UseContextExample() {
  const [theme, setTheme] = useState('light')                        

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="hook-container">
      <h1 className="hook-title">useContext</h1>
      <ThemeContext.Provider value={theme}>
        <ThemeMessage />
      </ThemeContext.Provider>
      <button className="hook-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  )
}

export default UseContextExample
