const mongoose = require('mongoose')


const otpSchema = new mongoose.Schema({

    phoneNumber: { 
        type: Number,
        required: true
     },

    otp: { 
        type: Number, 
        required: true
     },

    createdAt: {
         type: Date,
        default: Date.now, 
        expires: 300 
    }  // OTP expires after 5 minutes

  });


const Otp = mongoose.model('Otp', otpSchema);



module.exports = Otp
