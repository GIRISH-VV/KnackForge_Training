import React from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <nav>
        <h1>Bingo</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
