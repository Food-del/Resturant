import express from "express"
import { loginUser,registerUser, userInfo,addUserInfo } from "../controllers/usercontroller.js";


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/userdata",userInfo)
userRouter.post("/adduserinfo",addUserInfo)

export default userRouter;