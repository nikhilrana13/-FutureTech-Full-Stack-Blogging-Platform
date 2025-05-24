import sharp from "sharp";
import UserModel from "../models/UserModel.js";
import { SendVerficationCode, SendWelcomeEmail } from "./Email.js";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/Cloudinary.js";

export const Register = async (req, res) => {
  try {
    const { email, name } = req.body;

    // check if user already exists
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const newUser = await UserModel.create({
      name,
      email,
      verificationCode,
    });

    await newUser.save();
    await SendVerficationCode(email, verificationCode);

    return res.status(201).json({ message: "Sign up successful" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const VerifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    // console.log("code", code);

    // check if verfication code is valid or not
    const user = await UserModel.findOne({
      verificationCode: code,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid verification code or expired" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    // send jwt
    const token = jwt.sign({id:user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    // send welcome email
    await SendWelcomeEmail(user.email, user.name);

    return res
      .status(200)
      .json({ message: "Email verified successfully", token, user });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// for login users

export const Login = async(req,res)=>{
    try {
        const {email} = req.body;

        // check if user exists or not

        const user = await UserModel.findOne({
            email
        })

        if(!user){
            return res.status(400).json({message:"User not found with this email"})
        }

        if(user){
            const verficationCode = Math.floor(100000 + Math.random() * 900000).toString();
            user.verificationCode = verficationCode;
            await user.save();
            // send verification code to user email
            await SendVerficationCode(email,verficationCode)
            return res.status(200).json({message:"Verification code sent to your email",user})
        }
    } catch (error) {
        console.log("Error in login",error);
        return res.status(500).json({message:"Internal server error"})       
    }
}

// for login users verify email

export const LoginVerifyEmail = async(req,res)=>{
    try {
        const {code} = req.body;

        // check if verfication code is valid or not
        const user = await UserModel.findOne({
            verificationCode:code
        })

        if(!user){
            return res.status(400).json({message:"Invalid verification code or expired"})
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        await user.save();

        // send jwt
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"})

        await SendWelcomeEmail(user.email,user.name)
        return res.status(200).json({message:"Email verified successfully",token,user})

    } catch (error) {
        console.log("Error in login",error);
        return res.status(500).json({message:"Internal server error"})      
    }
}

export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,secure:false,sameSite:"lax"})
        return res.status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        console.log("Error in logout",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

// for getting user profile
export const GetUserProfile = async(req,res)=>{
  try {
        const userId = req.user;
        // check if user exists or not
        const user = await UserModel.findById(userId).populate("name email profilePicture");
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        return res.status(200).json({message:"User found successfully",user})
  } catch (error) {
    console.log("Error in get user profile",error);
    return res.status(500).json({message:"Internal server error"})
  }
}

// for update user profile 
export const UpdateUserProfile = async(req,res)=>{
  try {
       const userId = req.user;
       const {email,name} = req.body;
       console.log("req body",req.body);
      //  check if user exists or not
      const user = await UserModel.findById(userId);
      if(!user){
          return res.status(400).json({message:"User not found"})
      }
      
      // check if email is already taken or not
      const existingUser = await UserModel.findOne({email});
      if(existingUser && existingUser._id.toString() !== userId){
          return res.status(400).json({message:"Email already taken"})
      }
      // for updating profilepicture if no image is uploaded then image will be same as before
      let profilePictureUrl = user.profilePicture;
  
      // if image is uploaded then update profile picture
      if (req.file) {
        const OptimizedImageBuffer = await sharp(req.file.buffer)
          .resize({ width: 200, height: 200, fit: "inside" })
          .toFormat("jpeg", { quality: 80 })
          .toBuffer();

          const fileUrl = `data:image/jpeg;base64,${OptimizedImageBuffer.toString("base64")}`;
          const cloudResponse = await cloudinary.uploader.upload(fileUrl);
          profilePictureUrl = cloudResponse.url;
      }
      // console.log("req.file",req.file);
      

      const updateUser = await UserModel.findByIdAndUpdate(userId,{email,name,profilePicture:profilePictureUrl},{new:true});
      return res.status(200).json({message:"User updated successfully",updateUser})
  } catch (error) {
    console.log("Error in update user profile",error);
    return res.status(500).json({message:"Internal server error"})
  }
}
