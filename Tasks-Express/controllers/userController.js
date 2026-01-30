import User from '../models/userModel.js'

export const createUser = async (req,res) => {
    try{
        const user = await User.create(req.body)
        res.status(201).json({success : true , data : user}) // Instead of the frontend guessing if the operation worked, the API tells it explicitly.
    } catch(err){
        res.status(400).json({success : false, message:err.message})
    }
}

export const getUser = async (req,res) => {
    const id = req.params.id
    try{
        const user = await User.findById(id)
        res.status(200).json(user);
    } catch(err){
        res.status(400).json({success : false, message:err.message})
    }
}

export const updateUser = async (req,res) => {
    const id = req.params.id
    try{
        const user = await User.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        )
        if(!user){
            return res.status(404).json({message : 'User not found'})
        }
        res.status(200).json(user)
    } catch(err){
        res.status(400).json({success : false, message:err.message})
    }
}

export const deleteUser = async (req,res) => {
    const email = req.body
    try{
        const user = await User.deleteOne({email:"charles@gmail.com"})
        if (!product) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch(err){
        res.status(400).json({success : false, message:err.message})
    }
}