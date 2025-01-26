import { log } from "util";
import foodModel from "../models/foodmodel.js";
import fs from 'fs'


// add items

const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// // all category list 
// const listCategory = async (req,res) => {
//     try {
//         const category = await foodModel.distinct("category");
//         res.json({success:true,data:category})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// update food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findByIdAndUpdate(req.body.id,{status:req.body.status});
        // fs.unlink(`uploads/${food.image}`,()=>{})
        // await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Item Updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
        
    }
}

export {addFood,listFood,removeFood}