import mongoose from "mongoose";
import CommentModel from "./CommentModel.js";

const BlogSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    title:{type:String,required:true,trim:true},
    introduction:{type:String,required:true,trim:true},
    content:{type:String,required:true},
    image:{type:String,required:true},
    author:{type:String,required:true},
    category:{type:String,required:true,enum:["Technology","Health","Politics","Lifestyle","Entertainment","Education","Sports","Web Development"]},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User",default:[]}],
    views:{type:Number,default:0},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment",default:[]}],
    tableofcontent:[{type:String,required:true,default:[]}],
},{timestamps:true})

const BlogModel = mongoose.model("Blog",BlogSchema);

export default BlogModel