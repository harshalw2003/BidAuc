
const userModel = require('../Model/userModel.js');
const Otp = require('../Model/otpModel.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config()



const dashboardOverview = (req,res)=>{

    console.log('dashboardOverview API hit')
    try{


        console.log(req.user)

        if(req.user.role == 'Seeker'){

            res.sendFile(path.join(__dirname, '../public/Templates', 'dashboard-seeker.html'));

        }else{

            res.sendFile(path.join(__dirname, '../public/Templates', 'dashboard-provider.html'));

        }

        

}catch(e) {
        res.json({
                success : false,
                message : "Failed to Render Home Page",
                error : e.message
        })
}

}


module.exports = {

    dashboardOverview,

}
