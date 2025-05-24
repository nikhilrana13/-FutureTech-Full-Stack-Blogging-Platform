import express from "express"
import { CreateComment, GetAllCommentofpost } from "../controllers/CommentController.js";
import { isAuthenticated } from "../middleware/isAuthticated.js";
const router = express.Router();


router.post("/addcomment/:id",isAuthenticated,CreateComment)
router.get("/allcomments/:id",isAuthenticated,GetAllCommentofpost)

export default router