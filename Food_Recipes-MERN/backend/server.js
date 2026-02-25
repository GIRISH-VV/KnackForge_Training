import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import recipeRoute from './src/routes/recipe.route.js'

dotenv.config()
await connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/recipes', recipeRoute)
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'API is running' })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
