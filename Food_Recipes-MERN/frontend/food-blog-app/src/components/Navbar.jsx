import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <h2>Food Blog</h2>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/">My Recipe</NavLink></li>
        <li><NavLink to="/">Favourites</NavLink></li>
        <li><NavLink to="/">Login</NavLink></li>
      </ul>
    </header>
  )
}

export default Navbar
