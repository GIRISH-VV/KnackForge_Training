import mongoose from "mongoose";

export const connectDB = async () => {
    const url = "mongodb+srv://usergirish:girish12@cluster0.gyhtwi4.mongodb.net/exmongo"
    await mongoose.connect(url).then(()=>{
        console.log('Database Connected')
    }).catch((err)=>{
        console.log("Error connecting to database", err);
    });
}