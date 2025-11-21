import {User} from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Register User : /api/user/register

export const registerUser = async (req, res) => {
  
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res
            .status(400)
            .json({message: "All field are required", success: false})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res
            .status(400)
            .json({message: "User already exists", success: false})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email, 
            password: hashedPassword,
        })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.cookie("token", token, {
            httpOnly: true,      
            secure: process.env.NODE_ENV === "production",       
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "User registered successfully",
            success: true,
            user:{
                name: user.name,
                email: user.email
            },
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"})
        
    }
} 

// Login User: : /api/user/login

export const loginUser = async (req, res) =>{
    try {
        const {password, email} = req.body

        if(!email || !password){
            return res
            .status(400)
            .json({message: "All field are required", success: false})
        }

        const user = await User.findOne({email})

        if(!user){
           return res
            .status(400)
            .json({message: "Invalid email or password", success: false})  
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
          return res
            .status(400)
            .json({message: "Invalid email or password", success: false})    
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,      
            secure: process.env.NODE_ENV === "production",       
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

         res.json({
            message: "User loggedIn successfully",
            success: true,
            user:{
                name: user.name,
                email: user.email
            },
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"})
    }
}

// Logout User: /api/user/logout

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
        });

        return res.json({
            message: "Logged out successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// check Auth User : /api/user/is-auth

export const isAuthUser = async (req, res) => {
    try {
        const userId = req.user?.id; 

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.json({
            success: true,
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

