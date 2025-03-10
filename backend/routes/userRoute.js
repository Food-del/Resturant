import express from "express"
import { loginUser,registerUser, userInfo } from "../controllers/usercontroller.js";


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/userdata",userInfo)


export default userRouter;