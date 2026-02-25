import './App.css'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/api/v1'

const getAllRecipes = async () => {
  try {
    const response = await axios.get('/recipes')
    return response.data?.data || []
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return []
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation />,
    children: [
      { path: '/', element: <Home />, loader: getAllRecipes },
    ],
  },
])

const App = () => {
  return (
    <div>
       <RouterProvider router={router} />
    </div>
  )
}

export default App
