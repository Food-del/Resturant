import FeedbackModel from '../models/feedbackmodel.js'

const addfeedback = async(req,res)=>{
    
    const feedback= new FeedbackModel({
       userId:req.body.userId,
       feedbackText:req.body.feedbacktxt,
       feedbackDT:Date.now(),
       isPublic:req.body.isPublic
    })
    try {
        await feedback.save();
        res.json({success:true,message:"FeedBack Sent"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export{addfeedback}