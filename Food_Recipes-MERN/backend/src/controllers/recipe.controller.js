import mongoose from 'mongoose'
import Recipe from '../models/recipe.model.js'

const fallbackRecipes = [
  {
    _id: 'mock-1',
    title: 'Spicy Arrabiata Penne',
    ingredients: 'Penne, tomato, garlic, chilli flakes, olive oil',
    instructions: 'Boil pasta. Cook garlic and tomato sauce. Toss and serve.',
    time: '30',
    coverImage: '/assets/recipe-1.svg',
  },
  {
    _id: 'mock-2',
    title: 'Matar Paneer Masala',
    ingredients: 'Paneer, peas, onion, tomato, spices',
    instructions: 'Saute onion-tomato masala, add peas and paneer, simmer.',
    time: '35',
    coverImage: '/assets/recipe-2.svg',
  },
  {
    _id: 'mock-3',
    title: 'Veg Pulao Bowl',
    ingredients: 'Basmati rice, mixed vegetables, whole spices',
    instructions: 'Saute veggies and spices, add rice and cook until fluffy.',
    time: '25',
    coverImage: '/assets/recipe-3.svg',
  },
]

const canUseDatabase = () => mongoose.connection.readyState === 1

export const getRecipes = async (_req, res) => {
  try {
    if (canUseDatabase()) {
      const recipes = await Recipe.find().sort({ createdAt: -1 })
      return res.status(200).json({ success: true, data: recipes })
    }

    return res.status(200).json({ success: true, data: fallbackRecipes })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const getRecipe = async (req, res) => {
  try {
    const { id } = req.params

    if (canUseDatabase()) {
      const recipe = await Recipe.findById(id)
      if (!recipe) {
        return res.status(404).json({ success: false, message: 'Recipe not found' })
      }
      return res.status(200).json({ success: true, data: recipe })
    }

    const recipe = fallbackRecipes.find((item) => item._id === id)
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' })
    }

    return res.status(200).json({ success: true, data: recipe })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time, coverImage } = req.body

    if (!title || !ingredients || !instructions || !time) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' })
    }

    if (canUseDatabase()) {
      const recipe = await Recipe.create({
        title,
        ingredients,
        instructions,
        time,
        coverImage: coverImage || '/assets/recipe-1.svg',
      })

      return res.status(201).json({ success: true, message: 'Recipe added successfully', data: recipe })
    }

    const newRecipe = {
      _id: `mock-${Date.now()}`,
      title,
      ingredients,
      instructions,
      time,
      coverImage: coverImage || '/assets/recipe-1.svg',
    }

    fallbackRecipes.unshift(newRecipe)
    return res.status(201).json({ success: true, message: 'Recipe added in fallback mode', data: newRecipe })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params

    if (canUseDatabase()) {
      const recipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
      if (!recipe) {
        return res.status(404).json({ success: false, message: 'Recipe not found' })
      }

      return res.status(200).json({ success: true, message: 'Recipe updated successfully', data: recipe })
    }

    const recipeIndex = fallbackRecipes.findIndex((item) => item._id === id)
    if (recipeIndex === -1) {
      return res.status(404).json({ success: false, message: 'Recipe not found' })
    }

    fallbackRecipes[recipeIndex] = { ...fallbackRecipes[recipeIndex], ...req.body }
    return res.status(200).json({ success: true, message: 'Recipe updated in fallback mode', data: fallbackRecipes[recipeIndex] })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params

    if (canUseDatabase()) {
      const recipe = await Recipe.findByIdAndDelete(id)
      if (!recipe) {
        return res.status(404).json({ success: false, message: 'Recipe not found' })
      }

      return res.status(200).json({ success: true, message: 'Recipe deleted successfully' })
    }

    const recipeIndex = fallbackRecipes.findIndex((item) => item._id === id)
    if (recipeIndex === -1) {
      return res.status(404).json({ success: false, message: 'Recipe not found' })
    }

    fallbackRecipes.splice(recipeIndex, 1)
    return res.status(200).json({ success: true, message: 'Recipe deleted in fallback mode' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
