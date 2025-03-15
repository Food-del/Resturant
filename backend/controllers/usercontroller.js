import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email}).populate('areaId');
        
        
        if(!user){
            return res.json({success:false,message:"User Doesn't Exist"});
        }

        const isMatch =await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credintials"});
        }
        // const area = await AreaModel.findById(user.areaId);
        // console.log("hello: ",user);
        // console.log(area);
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

const updateUserInfo = async (req, res) => {
    try {
        const { name, phoneNo, address, areaId,id } = req.body;
        console.log(req.userId);
        const response = await userModel.findByIdAndUpdate(
            id,{
            name:name,
            phoneNo:phoneNo,
            address:address,
            areaI:areaId.area}
        );
        console.log(response);
        
        if (!response) {
            return res.json({ success: false, message: "Failed to update user info" });
        }
        res.json({ success: true, message: "Successfully updated user info" });
    } catch (error) {
        console.error("Error in updateUserInfo:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// const changePassword = async (req,res) => {
//     const {oldPassword,newPassword} = req.body;
//     console.log("id:" ,req.userId);
    
//     try {
//         const user = await userModel.findById(req.userId);
//         const isMatch =await bcrypt.compare(oldPassword,user.password)
//         if(!isMatch){
//             return res.json({success:false,message:"Invalid Credintials"});
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(newPassword,salt);
//         const response = await userModel.findByIdAndUpdate(req.userId,{password:hashPassword})
//         res.json({success:true,message:"Succefully Updated"})

//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message:"Error"})
//     }
// }


const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword,id } = req.body;
        // console.log("id:" ,id);
        // console.log("id:" ,req.userId);
        // console.log("id:" ,req.body.userId);
        // console.log("oldPassword:" ,oldPassword);
        // console.log("newPassword:" ,newPassword);
        // console.log("id:" ,req.body.id);
        // console.log("id:" ,req.body);
        // const userId = id || req.userId; // Use ID from body or JWT
        
        // console.log("User ID:", id);
        // console.log("User ID from token:", req.userId); // Debugging
        // console.log(oldPassword, newPassword); // Debugging
        
        // console.log("User ID from request:", req.body.userId); // Debugging

        // Check if userId exists
        // if (!req.userId) {
        //     return res.json({ success: false, message: "Unauthorized request" });
        // }
        // console.log(userId);
        // console.log(req.body.userId);
        // const har = req.body.user;
        // console.log(req.body.user);
        const user = await userModel.findById(id);
        console.log(user);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.password) {
            return res.json({ success: false, message: "Password not set for this user" });
        }

        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        // Update password in the database
        const response = await userModel.findByIdAndUpdate(
            id,
            { password: hashPassword },
            { new: true } // Ensure it returns updated document
        );

        if (!response) {
            return res.json({ success: false, message: "Failed to update password" });
        }

        res.json({ success: true, message: "Successfully updated password" });

    } catch (error) {
        console.error("Error in changePassword:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//add address and other info in usermodel
const addUserInfo=async(req,res)=>{
    try {
        const{id,street,area,phone} = req.body
        const response = await userModel.findByIdAndUpdate(id,{
            phoneNo:phone,
            address:street,
            areaId:area
    })
    res.json({success:true,message:"Succefully Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

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

export{loginUser,registerUser,userInfo,addUserInfo,changePassword,updateUserInfo};