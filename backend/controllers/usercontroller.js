import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesn't Exist"});
        }

        const isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credintials"});
        }
         
        const token=createToken(user._id);
        res.json({success:true,token,user})


    }catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const userInfo = async (req, res) => {
    try {
        const userData = await userModel.findById(req.userId).select("-password"); // Correct usage
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, data: userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Can't fetch user's data" });
    }
};



//register user 
const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        // checking is user already exists
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"User already Exists"});
        }
 
        //validating email & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter Valid Email"});
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"});
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashPassword
        })
        
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export{loginUser,registerUser,userInfo};