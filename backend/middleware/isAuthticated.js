import jwt from "jsonwebtoken";


export const isAuthenticated = async(req,res,next)=>{
    try {
         const token = req.cookies.token;
         console.log("token",token);

         if(!token){
            return res.status(401).json({message:"Please login first"});
         }

         const decoded = jwt.verify(token,process.env.JWT_SECRET);
         req.user = decoded.id;
        next();
    } catch (error) {
        console.log("Error in isAuthenticated",error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}