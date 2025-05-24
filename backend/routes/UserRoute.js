import express from "express";
import { Login, Register, VerifyEmail,LoginVerifyEmail,Logout, GetUserProfile ,UpdateUserProfile} from "../controllers/UserController.js";
import { isAuthenticated } from "../middleware/isAuthticated.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

// routes for signup //
router.post("/register",Register);
router.post("/verifyregister",VerifyEmail);

// routes for login users //
router.post("/login",Login);
router.post("/verifylogin",LoginVerifyEmail);

// user profile //
router.get("/profile",isAuthenticated,GetUserProfile);
router.patch("/updateprofile",upload.single("profilePicture"),isAuthenticated,UpdateUserProfile);


// routes for logout //
router.get("/logout",Logout);

export default router
