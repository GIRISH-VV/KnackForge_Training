import mongoose from 'mongoose'

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not set. Running backend in fallback mode.')
    return false
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected successfully')
    return true
  } catch (error) {
    console.warn(`Unable to connect DB, running fallback mode: ${error.message}`)
    return false
  }
}

export default connectDB
