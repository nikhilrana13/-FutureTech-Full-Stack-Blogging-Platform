import express from "express";
import { CreateBlog, DeleteBlog, GetAllBlogs,GetEachBlogDetails,GetUserBlogs ,UpdateBlog} from "../controllers/BlogController.js";
import { isAuthenticated } from "../middleware/isAuthticated.js";
import multer from "multer";
const router = express.Router();


// multer config
const storage = multer.memoryStorage();
const upload = multer({storage:storage});



// blog routes //
router.post("/createblog",upload.single("image"),isAuthenticated,CreateBlog);
router.get("/allblogs",GetAllBlogs);
router.get("/userblogs",isAuthenticated,GetUserBlogs);
router.get("/:id",GetEachBlogDetails);
router.delete("/delete/:id",isAuthenticated,DeleteBlog);
router.put("/update/:id",isAuthenticated,upload.single("image"),UpdateBlog);


export default router