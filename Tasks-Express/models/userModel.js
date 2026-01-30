import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema); //Mongoose Pluralizes User to user - Collection name

export default User;
