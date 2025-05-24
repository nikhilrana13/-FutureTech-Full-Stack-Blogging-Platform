import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middleware/isAuthticated.js";
import { AddLikeAndDislike } from "../controllers/LikeController.js";



router.post("/addlike/:id",isAuthenticated,AddLikeAndDislike);

export default router