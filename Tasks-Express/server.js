import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import errorHandler from './middlewares/errorHandler.js'

dotenv.config()

const app = express()
app.use(express.json())

await connectDB()

app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.use('/api/users',userRoutes)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})