import mongoose from 'mongoose'

const connectDB = async() => {
    try{
        const url = process.env.MONGO_URL
        await mongoose.connect(url)
        console.log('Database Connected Successfully')
    } catch(err) {
        console.log('Failed to Connect DB',err.message)
        // throw new Error('DB_Connection_Failed') 
    }
}

export default connectDB
