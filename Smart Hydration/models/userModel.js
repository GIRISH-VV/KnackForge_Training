import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    weight : {
        type : Number
    },
    height : {
        type :Number
    },
    activityLevel : {
        type : String
    },
    climate : {
        type : String
    },
    dailyGoal : {
        type : String
    },
    unit : {
        type : String, enum : ['ml', 'oz']
    }
}, { timestamps: true })

const User = mongoose.model('User',userSchema)

export default User