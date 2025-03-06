import categoryModel from "../models/categorymodel.js";

//category list
const listCategory = async (req,res) => {
    try {
        const category = await categoryModel.find({});
        res.json({success:true,data:category})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//add category

const addCategory = async (req,res) => {

    let image_filename = `${req.file.filename}`

    const  category = new categoryModel({
        name:req.body.name,
        details:req.body.details,
        image:image_filename
    })
    try {
        await category.save();
        res.json({success:true,message:"Category Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//deactivte category
const removeCat = async (req,res) => {
    try {
        const cat = await categoryModel.findByIdAndUpdate(req.body.id,{status:req.body.status});
        // fs.unlink(`uploads/${food.image}`,()=>{})
        // await foodModel.findByIdAndDelete(req.body.id);
            
        
            res.json({success:true,message:"Item Updated"})
        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }
}

export {listCategory,addCategory,removeCat};