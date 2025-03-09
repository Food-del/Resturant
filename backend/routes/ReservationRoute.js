import express from "express"
import authMiddleware from "../middleware/auth.js"
import { addReservation, verifiReservation,FetchReservs } from "../controllers/ReservationController.js";

const ReservationRouter = express.Router();

ReservationRouter.post('/reserve',authMiddleware,addReservation);
ReservationRouter.post('/verifi',verifiReservation);
ReservationRouter.get('/reslist',FetchReservs);

export default ReservationRouter;