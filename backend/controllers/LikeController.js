import BlogModel from "../models/BlogModel.js";



export const AddLikeAndDislike = async(req,res)=>{
    try {
        const userId = req.user;
        // console.log("like userId",userId);
        if(!userId){
            return res.json({message:"Login to like a post"});
        }
        const postId = req.params.id;
        const blog = await BlogModel.findById(postId);
        if(!blog){
            return res.json({message:"Blog not found"});
        }
        // check if user already liked the post if yes then remove userid from likes array if no then add userid to likes array
        let updatedBlog;
        if(blog.likes.includes(userId)){
            updatedBlog = await BlogModel.findByIdAndUpdate(postId,{$pull:{likes:userId}},{new:true});
            return res.status(200).json({message:"You disliked the post",updatedBlog});
        }else{
            updatedBlog = await BlogModel.findByIdAndUpdate(postId,{$push:{likes:userId}},{new:true});
            return res.status(200).json({message:"You liked the post",updatedBlog});
        }

        } catch (error) {
        console.log("Error in add like",error.message);
        return res.status(500).json({message:"Internal server error", error: error.message});
    }
}

