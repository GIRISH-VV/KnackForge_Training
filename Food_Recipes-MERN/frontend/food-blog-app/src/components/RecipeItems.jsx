import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { BsStopwatchFill } from 'react-icons/bs'
import { useLoaderData } from 'react-router-dom'

const RecipeItems = () => {
  const recipes = useLoaderData() || []

  if (!recipes.length) {
    return <p className="empty-text">No recipes found.</p>
  }

  return (
    <div className="card-container">
      {recipes.map((item) => (
        <div key={item._id} className="card">
          <img src={item.coverImage || '/assets/recipe-1.svg'} width="120" height="100" alt={item.title} />
          <div className="card-body">
            <div className="title">{item.title}</div>
            <div className="icons">
              <div className="timer">
                <BsStopwatchFill />
                <span>{item.time}min</span>
              </div>
              <FaHeart />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecipeItems
