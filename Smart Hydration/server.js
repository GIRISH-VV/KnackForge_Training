import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'
import session from "express-session";
import authRoutes from './routes/authRoutes.js'

dotenv.config()
await connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use('/api/users',authRoutes)

const PORT =  5000 || process.env.PORT

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`)
})