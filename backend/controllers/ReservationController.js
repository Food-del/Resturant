import ReservationModel from "../models/ReservationModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY2)


const addReservation = async (req,res)=>{

    const frontend_url = "http://localhost:5174"

    try {
        const newReservation = new ReservationModel({
            userId:req.body.userId,
            First_Name:req.body.firstname,
            Last_name:req.body.lastname,
            People:req.body.people,
            Time:req.body.time,
            Amount:100,
            Date:req.body.date,
            Mobile:req.body.mobileno,
            Payment:false
        })
        await newReservation.save();
        console.log("suiiiiii");
        
        const line_items = [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Table Reservation",
                    },
                    unit_amount: 100 * 100, // Stripe expects the amount in cents
                },
                quantity: 1
            }
        ];
        
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verifi?success=true&reservationId=${newReservation._id}`,
            cancel_url: `${frontend_url}/verifi?success=false&reservationId=${newReservation._id}`
        });
        
        // console.log(newReservation._id,"?  ");
        
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Errorss"})
    }
    console.log("hii");

}

const verifiReservation = async(req,res) =>{
    const {reservationId,success} = req.body;
    console.log(req.body);
    console.log("hii");

    try {
        if(success=="true"){
            await ReservationModel.findByIdAndUpdate(reservationId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await ReservationModel.findByIdAndUpdate(reservationId,{payment:false});
            res.json({success:false,message:"Not paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
    console.log("hello");

}

export {addReservation,verifiReservation}