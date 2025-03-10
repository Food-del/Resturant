import express from "express"
import authMiddleware from "../middleware/auth.js"
import { addReservation, verifiReservation,FetchReservs, userReservation } from "../controllers/ReservationController.js";

const ReservationRouter = express.Router();

ReservationRouter.post('/reserve',authMiddleware,addReservation);
ReservationRouter.post('/verifi',verifiReservation);
ReservationRouter.get('/reslist',FetchReservs);
ReservationRouter.post('/userreservation',authMiddleware,userReservation);

export default ReservationRouter;