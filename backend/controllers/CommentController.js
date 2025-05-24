
import BlogModel from "../models/BlogModel.js";
import CommentModel from "../models/CommentModel.js";
import UserModel from "../models/UserModel.js";


export const CreateComment = async(req,res)=>{
    try {
        const userId = req.user;
        const blogId = req.params.id;
        const {commentText} = req.body;
        
        // check if user exists or not
        const user = await UserModel.findById(userId).populate("name email profilePicture");
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        // check if blog exists or not
        const blog = await BlogModel.findById(blogId);
        if(!blog){
            return res.status(400).json({message:"Blog not found"});
        }
        // create comment
        const comment = await CommentModel.create({
            blogId,
            user:userId,
            commentText
        })

        // add comment to blog comments array
       await BlogModel.findByIdAndUpdate(blogId,
        {$push:{comments:comment._id}
    })

        return res.status(200).json({message:"Comment created successfully",comment,user})

    } catch (error) {
        console.log("Error in create comment",error.message);
        return res.status(500).json({message:"Internal server error", error: error.message});
    }
}

export const GetAllCommentofpost = async(req,res)=>{
    try {
        const userId = req.user;
        const user = await UserModel.findById(userId)
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const blogId = req.params.id 
        
        const blog = await BlogModel.findById(blogId).populate({path:"comments",populate:{path:"user",select:"name email profilePicture"}})
        if(!blog){
            return res.status(400).json({message:"Blog not found"})
        }

        return res.status(200).json({message:"Comments found",blog})
        
    } catch (error) {
         console.log("Error in gets comments",error.message);
        return res.status(500).json({message:"Internal server error", error: error.message});
    }
}

