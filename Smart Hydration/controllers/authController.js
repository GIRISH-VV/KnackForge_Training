import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import bcrypt from "bcryptjs";

import { generateAccessToken ,generateRefreshToken} from '../utils/token.js'

export const refreshAccessToken = async (req,res) => {
    const oldRefreshToken = req.cookies.refreshToken
    if(!oldRefreshToken) 
        return res.status(401).json({ message : "Refresh Token Required" })

    try {
        const decoded = jwt.verify(oldRefreshToken , process.env.JWT_REFRESH_TOKEN_SECRET)
        const user = await User.findById(decoded.id)

        if(!user || user.refreshToken !== oldRefreshToken)
            return res.status(403).json({ message : "Invalid refresh token"})

        const newAccessToken = generateAccessToken(user._id)    //user._id is taken from memory
        res.status(200).json({ accessToken : newAccessToken})
    } 
    catch (error) {
        res.status(403).json({ message : "Invalid refresh token"})
    }
}

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    //  Store refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //  Store user info in session
    req.session.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      success: true,
      accessToken, // frontend stores this in memory
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

