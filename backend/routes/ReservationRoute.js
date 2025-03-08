import express from "express"
import authMiddleware from "../middleware/auth.js"
import { addReservation, verifiReservation } from "../controllers/ReservationController.js";

const ReservationRouter = express.Router();

ReservationRouter.post('/reserve',authMiddleware,addReservation);
ReservationRouter.post('/verifi',verifiReservation);

export default ReservationRouter;