    import mongoose, { Schema } from 'mongoose'

    const userSchema = new mongoose.Schema({
        name:{type:String,require:true},
        email:{type:String,require:true,unique:true},
        password:{type:String,require:true},
        cartData:{type:Object,default:{}},
        phoneNo:{type:Number,length:10},
        address:{type:String},
        areaId:{type:Schema.Types.ObjectId,ref:"area"},
        city:{type:String,default:"Ahmedabad "}
       
    },{minimize:false})

    const userModel =  mongoose.models.user || mongoose.model("user",userSchema);
    export default userModel;