import express from "express"
import {changePassword, loginUser,registerUser, userInfo,addUserInfo, updateUserInfo } from "../controllers/usercontroller.js";
import authMiddleware from "../middleware/auth.js";


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/userdata",userInfo)
userRouter.post("/adduserinfo",addUserInfo)
userRouter.post("/change-password", changePassword, authMiddleware);
userRouter.post("/update-info",updateUserInfo);

export default userRouter;