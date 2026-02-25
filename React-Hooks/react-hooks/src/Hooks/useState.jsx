import { useState } from 'react'
import './common.css'

function UseStateExample() {
  
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  })

  const newCar = () => {
    setCar({
      brand: "BMW",
      model: "X5",
      year: "2020",
      color: "blue"
    })
  }

  return (
    <div className="hook-container">
      <h1 className="hook-title">useState</h1>
      <h2 className="hook-text">
        It is a {car.color} {car.model} {car.brand} from {car.year}
      </h2>
      <button className="hook-button" onClick={newCar}>
        Change Car
      </button>
    </div>
  )
}

export default UseStateExample
 
