import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import BlogRoute from "./routes/BlogRoute.js";
import CommentRoute from "./routes/CommentRoute.js"
import LikeRoute from "./routes/LikeRoute.js"


dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();


// middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes //
app.use("/api/user",UserRoute);
app.use("/api/blog",BlogRoute);
app.use("/api/comment",CommentRoute);
app.use("/api/like",LikeRoute);




// connect to db //
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to DB");
}).catch((error)=>{
    console.log("Error connecting to DB",error);
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})