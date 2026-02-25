import React from 'react'
import RecipeItems from '../components/RecipeItems'

function Home() {
  return (
    <div>
      <section className="home">
        <div className="left">
          <h1>Food Recipe</h1>
          <h5>
            The best place to share and discover delicious recipes from around the world. Join our community of food lovers and start sharing your  creations today!
          </h5>
          <button>Share your recipe</button>
        </div>
        <div className="right">
          <img src="/assets/hero-food.svg" alt="Food bowl" width="340" height="340" />
        </div>
      </section>
      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#d4f6e8" fillOpacity="1" d="M0,64L26.7,80C53.3,96,107,128,160,149.3C213.3,171,267,181,320,181.3C373.3,181,427,171,480,154.7C533.3,139,587,117,640,106.7C693.3,96,747,96,800,122.7C853.3,149,907,203,960,192C1013.3,181,1067,107,1120,85.3C1173.3,64,1227,96,1280,101.3C1333.3,107,1387,85,1413,74.7L1440,64L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z" />
        </svg>
      </div>
      <div className="recipe">
        <RecipeItems />
      </div>
    </div>
  )
}

export default Home
