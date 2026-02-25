import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: String,
      required: true,
      trim: true,
    },
    instructions: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      default: '/assets/recipe-1.svg',
    },
  },
  { timestamps: true }
)

const Recipe = mongoose.model('Recipe', recipeSchema)
export default Recipe
