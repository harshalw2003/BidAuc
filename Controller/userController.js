
const userModel = require('../Model/userModel.js');
const Otp = require('../Model/otpModel.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const multer = require('multer');
const QRCode = require('qrcode');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config()



const generateOtp = async(req, res) =>{
  console.log("Generate OTP API hit")

  console.log(req.body)

  try{  

  const otpNumber = Math.floor(100000 + Math.random() * 900000).toString();
  const user = { phoneNumber:req.body.phoneNumber , otp:otpNumber};
  const newOtp = new Otp(user)
  await newOtp.save();
  console.log(newOtp)
 

  res.json({

     message: "OTP generated successfully",
     success : true,
     otp : otpNumber
  
 });
}catch(err){

  res.json({
     message: "Error Generating OTP",
     success : false,
     error : err.message
  
})
}

}


const registerUser = async (req, res) => {

  console.log("User register API hit")
  
  try {

  const { userName, phoneNumber, otp, role } = req.body;

  const otpRecord = await Otp.findOne({phoneNumber: req.body.phoneNumber});
  console.log(otpRecord)


  if (!otpRecord) {
    res.status(400).json({ message: "OTP Expired" });
  }else if(otpRecord.otp == req.body.otp){

    console.log("OTP Correct!!")

    const alreadyexist = await userModel.findOne({ phoneNumber: req.body.phoneNumber });

    if (!alreadyexist) {
      
      const userDetails = {

        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        role : req.body.role
      
      }

      // await userModel.create(userDetails);
      const newUser = new userModel(userDetails);
      await newUser.save();
      await Otp.deleteOne(otpRecord)
      console.log(newUser)

      res.json({

        message : "User Registered Successfully!!",
        success : true,


      })

    } else {

      res.json({

        success: false,
        message: "User already exist with this email",

      })

    }
   
  }else{

    res.status(400).json({ message: 'Invalid OTP' });



  }


    


  } catch (error) {

    res.json({
      success: false,
      message: error.message,
      

    })

  }
}


const loginUser = async (req, res) => {

  console.log("Login API hit")
  const userLoginDetails = req.body;
  try {

    const {  phoneNumber, otp } = req.body;

    const otpRecord = await Otp.findOne({phoneNumber: req.body.phoneNumber});

   
    const user = await userModel.findOne({ phoneNumber: userLoginDetails.phoneNumber });
    console.log(user)

    if (user) {
      if (!otpRecord) {

        return res.status(400).json({ message: 'Invalid or expired OTP' });

      }else if(otpRecord.otp == req.body.otp) {

        console.log("Otp Correct!!")
        //  const ExpiryTimeInSec = Math.floor(new Date() / 1000) + (60 *60) //after 1 Hour
        const userPayLoad = {

          phoneNumber: user.phoneNumber,
          email: user.email,
          _id: user._id

        } 

        const token = jwt.sign(userPayLoad, process.env.JWT_SECRET_KEY)
        res.cookie('token', token, { httpOnly: true });
        await userModel.findByIdAndUpdate(user._id, { token: token })
        await Otp.deleteOne(otpRecord)

        res.json({
          success: true,
          message: "User logged in successfully",
          jwtToken: token
        });
      }
    } else {
      res.json({
        success: false,
        message: "User not found",

      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};



const updateDetails = async (req, res) => {

  console.log("User update details API hit")
  try {
  console.log(JSON.stringify(req.body))
  const user = req.user
  console.log(user)
  // await userModel.findByIdAndUpdate(user._id, updatedDetails)
  // update.save()
  res.json({
    success: true,
    message: "User details updated successfully",
    
    
  })
  }catch (err) {

    res.json({
      success: false,
      message: err.message})
  }

}


const uploadProfile = async (req, res) => {

  try { 
    // console.log(req)
    const user = await userModel.findById(req.user._id);
    user.profilePicture = req.file.path;
    // await user.findByIdAndUpdate(user._id,{profilePicture : req.file.path})
    await user.save();
    res.json({
      sucess : true,
      message : 'File uploaded successfully'});
  } catch (error) {
    res.status(400).json(
      {
        success : false,
        message : 'Error uploading file'}
    );
  }

}


const logoutUser = async (req, res) => {

  console.log("User logout API hit")
  res.clearCookie('token');
  console.log(req.user)
  if (req.user) {
    const user = await userModel.findByIdAndUpdate(req.user._id, { token: "" })
    res.json({
      success: true,
      message: "User logged out successfully"
    })
  } else {
    res.json({
      success: false,
      message: "User Already logged out",
    })
  }
}







module.exports = {
  generateOtp,
  registerUser,
  loginUser,
  uploadProfile,
  logoutUser,
  updateDetails,

}