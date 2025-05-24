import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
     name:{type:String,required:true},
     email:{type:String,required:true,unique:true},
     isVerified:{type:Boolean,default:false},
     verificationCode:{type:String},
     profilePicture:{type:String,default:"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"},
     allBlogs:[{type:mongoose.Schema.Types.ObjectId,ref:"Blog"}]
},{timestamps:true})

const UserModel = mongoose.model("User",UserSchema)
export default UserModel;