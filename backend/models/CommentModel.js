import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    blogId:{type:mongoose.Schema.Types.ObjectId,ref:"Blog",required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    commentText:{type:String,required:true},
    commentDate:{type:Date,default:Date.now}
})

const CommentModel = mongoose.model("Comment",CommentSchema);
export default CommentModel