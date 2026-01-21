import mongoose from "mongoose";

export const connectDB = async () => {
    const MONGODB_URI = 'mongodb+srv://girishkumarvv:girish1234@cluster0.vcslwdb.mongodb.net/expressjs'
    await mongoose.connect(MONGODB_URI).then(()=>{
        console.log('Database Connected')
    })
}