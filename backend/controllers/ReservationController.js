import ReservationModel from "../models/ReservationModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY2)


const addReservation = async (req,res)=>{

    const frontend_url = "http://localhost:5173"

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


}

const verifiReservation = async(req,res) =>{
    const {reservationId,success} = req.body;
   
    

    try {
        if(success=="true"){
            await ReservationModel.findByIdAndUpdate(reservationId,{Payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await ReservationModel.findByIdAndUpdate(reservationId,{payment:false});
            res.json({success:false,message:"Not paid"})
            console.log("false")
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
 

}

const FetchReservs = async (req,res)=>{
    try {
        const reservs = await ReservationModel.find({})
        res.json({success:true,data:reservs})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
   
}

//fetch user's reservation in user page

const userReservation = async(req,res)=>{
    try {
        const Reservations = await ReservationModel.find({userId:req.body.userId})
        res.json({success:true,data:Reservations})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Can't fetch reservations"})
    }
}

const UpdateStatus = async(req,res)=>{
   const {id,status} = req.body
    try {
        const ressponse = await ReservationModel.findByIdAndUpdate(id,{Status:status})
        res.json({success:true})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Can't Update Status"})
    }
}


export {addReservation,verifiReservation,FetchReservs,userReservation,UpdateStatus}
