import express from "express"
import { addfeedback } from "../controllers/feedbackcontroller.js"
import multer from "multer"

const fedRouter = express.Router()





fedRouter.post("/add",addfeedback)
export default fedRouter;