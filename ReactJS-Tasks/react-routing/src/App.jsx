import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Users from './Pages/Users'
import About from './Pages/About'
import Contact from './Pages/Contact'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
