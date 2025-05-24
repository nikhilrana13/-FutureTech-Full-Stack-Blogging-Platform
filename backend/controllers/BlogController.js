import sharp from "sharp";
import UserModel from "../models/UserModel.js";
import cloudinary from "../utils/Cloudinary.js";
import BlogModel from "../models/BlogModel.js";




export const CreateBlog = async(req,res)=>{
    try {
        // get blog data from req.body
        const {title,introduction,content,category,tableofcontent,author} = req.body;
        console.log("req.file",req.file);
        // console.log("req.user",req.user);
        console.log("req.body",req.body);

        // convert tableofcontent to array
        const toArray = tableofcontent.split(/\n|,|\r|\t|-/).map(item=>item.trim()).filter(Boolean);
        // console.log("toArray",toArray);
        // get user id from req.user
        const userId = req.user
        // check if user exists or not
        const user = await UserModel.findOne({_id:userId})

        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        // check all fields are filled or not and send error message if not filled
        if(!title || !introduction || !content || !category || !toArray.length || !userId || !req.file || !author){
            return res.status(400).json({message:"All fields are required"})
        }
        // check if image is uploaded or not
        if(!req.file){
            return res.status(400).json({message:"Image is required"})
        }
        // optimize image or cloudinary
        const OptimizedBufferImage = await sharp(req.file.buffer).resize({width:500,height:500,fit:"inside"}).toFormat("jpeg",{quality:90}).toBuffer();
        // convert image to base64
        const fileUrl = `data:image/jpeg;base64,${OptimizedBufferImage.toString("base64")}`
        // upload image to cloudinary
        const cloudResponse = await cloudinary.uploader.upload(fileUrl);
        const imageUrl = cloudResponse.secure_url;
        // create blog
        const blog = await BlogModel.create({
            userId,
            title,
            introduction,
            content,
            image:imageUrl,
            author,
            category,
            tableofcontent:toArray
        })
        // push to user blogs array
        user.allBlogs.push(blog._id);
        await user.save();

        return res.status(200).json({message:"Blog created successfully",blog})        
    } catch (error) {
        console.log("Error in create blog",error.message);
        return res.status(500).json({message:"Internal server error", error: error.message})
    }
}

export const GetAllBlogs = async(req,res)=>{
    try {
        const Blogs = await BlogModel.find({}).populate("userId","name email profilePicture").populate("likes").populate("comments");

        if(!Blogs){
            return res.status(400).json({message:"No blogs found"})
        }

        return res.status(200).json({message:"Blogs found successfully",Blogs})
        
    } catch (error) {
        console.log("Error in get all blogs",error.message);
        return res.status(500).json({message:"Internal server error", error: error.message});
    }
}

export const GetEachBlogDetails = async(req,res)=>{
    try {
    
        const blogId = req.params.id;
        // check if blog exists or not
        const blog = await BlogModel.findById(blogId).populate("userId","name email").populate("likes").populate("comments");

        if(!blog){
            return res.status(400).json({message:"Blog not found"})
        }

        return res.status(200).json({message:"Blog found successfully",blog})
    } catch (error) {
        console.log("Error in get each blog details",error.message);
        return res.status(500).json({message:"Internal server error", error: error.message});
    }
}

export const GetUserBlogs = async(req,res)=>{
    try {
        const userId = req.user;
        console.log("userId",userId);
        // check if user exists or not
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const blog = await BlogModel.find({userId}).populate("userId","name email").populate("likes").populate("comments");

        if(!blog){
            return res.status(400).json({message:"Blog not found"})
        }
        
        return res.status(200).json({message:"Blogs found successfully",blog})
    } catch (error) {
        console.log("Error in get user blogs",error.message);
        return res.status(500).json({message:"Internal server error", error: error.message});
        
    }
}

export const DeleteBlog = async(req,res)=>{
    try {
        const userId = req.user;
        const user = await UserModel.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const blogId = req.params.id;
        // console.log("blogid",blogId)

        const blog = await BlogModel.findByIdAndDelete(blogId)
        if(!blog){
            return res.status(400).json({message:"Blog not found"})
        }
        // delete blog from user allblogs array
        await UserModel.findByIdAndUpdate(userId,{
            $pull:{allBlogs:blogId}
        })

        return res.status(200).json({message:"Blog Deleted successfully"})
    } catch (error) {
        console.log("Error in delete blog",error.message);
        return res.status(500).json({message:"Internal server error",error:error.message})
        
    }
}

export const UpdateBlog = async(req,res)=>{
    try {
        const userId = req.user;
        const blogId = req.params.id;

        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const blog = await BlogModel.findById(blogId);

        if(!blog){
            return res.status(400).json({message:"Blog not found"})
        }

        const {title,introduction,content,category,tableofcontent,author} = req.body;

        let imageUrl = blog.image;  // if no image is uploaded then image will be same as before

        // if image is uploaded then update image url on cloudinary
        if(req.file){
            const OptimizedImageBuffer = await sharp(req.file.buffer)
            .resize({width:400,height:400,fit:"inside"})
            .toFormat("jpeg",{quality:80})
            .toBuffer();

            const fileUrl = `data:image/jpeg;base64,${OptimizedImageBuffer.toString("base64")}`
            const cloudResponse = await cloudinary.uploader.upload(fileUrl);
            imageUrl = cloudResponse.url;
        }

        // update blog
        const updatedBlog = await BlogModel.findByIdAndUpdate(blogId,{
            title,
            introduction,
            content,
            category,
            tableofcontent,
            author,
            image:imageUrl
        },{new:true})
        return res.status(200).json({message:"Blog updated successfully",updatedBlog})
    } catch (error){
        console.log("Error in update blog",error.message);
        return res.status(500).json({message:"Internal server error",error:error.message})
 }
}







