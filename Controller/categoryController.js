
const userModel = require('../Model/userModel.js');
const Otp = require('../Model/otpModel.js');
const categoryModel = require('../Model/categoryModel.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config()


const getAllCategories = async (req, res) => {

    console.log('GetAllCategories API Hit')
    try{


        const AllCategories = await categoryModel.find({})
        console.log(AllCategories)
        res.json({
            success: true,
            message: "Categories was successfully retrieved",
            categories : AllCategories
        })

        

        

}catch(e) {
        res.json({
                success : false,
                message : "Failed to fetch all categories",
                error : e.message
        })
}


}



const getOneCategory =async (req,res)=>{

    console.log('GetOneCategories API Hit')
    try{

        const targetCategory = req.body.categoryName
        console.log(targetCategory)
        const category = await categoryModel.findOne({categoryName : targetCategory})
        console.log(category)
        res.json({
            success: true,
            message: "Category was successfully retrieved",
            category : category
        })

        

        

}catch(e) {
        res.json({
                success : false,
                message : "Failed to fetch category information",
                error : e.message
        })
}

}



module.exports = {

    getAllCategories,
    getOneCategory,

}
