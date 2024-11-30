
const userModel = require('../Model/userModel.js');
const Otp = require('../Model/otpModel.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const multer = require('multer');
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { json } = require('express');
const twilio = require("twilio");
const otpClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN);


dotenv.config()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/static/Assets/uploads/profile-pictures'); // Store in this directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });




const generateOtp = async(req, res) =>{
  console.log("Generate OTP API hit")

  console.log(req.body)

  try{  

  const otpNumber = Math.floor(100000 + Math.random() * 900000).toString();
  const ifOtpExist = await Otp.findOne({phoneNumber:req.body.phoneNumber})
  if(ifOtpExist){

    await Otp.deleteOne({phoneNumber:req.body.phoneNumber})

  }
  const user = { phoneNumber:req.body.phoneNumber , otp:otpNumber};

  const newOtp = new Otp(user)
  console.log(newOtp)
  
//Method to send the otp to phone number
const sendSMS = async (body) =>{

    let msgOptions = {

        from: process.env.SEND_OTP_FROM_NUMBER,
        to:"+91"+req.body.phoneNumber ,
        body
    }
    try{
        const message = await otpClient.messages.create(msgOptions)  
        // console.log(message);
    }catch(e){
        console.error(e);
    }
}

// sendSMS(`Your OTP is: ${otpNumber}`);

await newOtp.save();
 

  res.json({

     message: "OTP Sent successfully",
     success : true
     
  
 });
}catch(err){

  res.json({
     message: "Error Sending OTP",
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



const updatePersonalDetails = async (req, res) => {

  console.log("User update details API hit")
  try {
  console.log(req.body)
  const user = req.user
  console.log(user)
  const updatedDetails = req.body
   await userModel.findByIdAndUpdate(user._id, updatedDetails)
  // await userUpdated.save()
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


const uploadProfilePicture= async (req, res) => {
  try {
    const userId = req.user._id; // Assuming userId is available from authentication middleware
    const newProfilePicPath = req.file.path;

    // Find the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete old profile picture if it exists
    if (user.profilePicture) {
      const oldProfilePicPath = user.profilePicture;
      fs.unlink(oldProfilePicPath, (err) => {
        if (err) {
          console.log(`Error deleting old profile picture: ${err.message}`);
        }
      });
    }

    // Update user profile picture
    user.profilePicture = newProfilePicPath;
    await user.save();

    res.json({
      success: true,
      message: 'Profile picture updated successfully',
      profilePic: newProfilePicPath
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

const getUserDetails = async (req, res) => {

  try{

  const userDetails = await userModel.findById(req.user._id)
  res.json({success: true,
    message: 'User details retreived successfully',
    userDetails: userDetails});
  }catch(err){

    res.json({success: false,
       message: "Error while retrieving user details",
       error: err.message})

  
  }
  
};


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

const getAllProviders = async (req, res) => {
  
  
  console.log("Get All Providers API hit")
  try{

    const allProviders = await userModel.find({role: "Provider"});
    res.json({
      success: true,
      message: "All Providers fetched successfully",
      providers: allProviders
    })
  }catch(err) {

    res.json({
      success: false,
      message: err.message,
      
    })
  }



}


const checkUserIsProvider = async (req, res) => {

  const user = req.user

  if(user.role == 'Provider'){

    res.json({
      success: true,
      message: "User Logged in as Provider"
    })
  }else{

    res.json({success: false, message: "User Logged in as Seeker"});
  }
}


const checkUserIsSeeker = async (req, res) => {

  const user = req.user

  if(user.role == 'Seeker'){

    res.json({
      success: true,
      message: "User Logged in as Seeker"
    })
  }else{

    res.json({success: false, message: "User Logged in as Provider"});
  }
}









module.exports = {
  generateOtp,
  registerUser,
  loginUser,
  uploadProfilePicture,
  getUserDetails,
  logoutUser,
  updatePersonalDetails,
  getAllProviders,
  upload,
  checkUserIsProvider,
  checkUserIsSeeker,

}