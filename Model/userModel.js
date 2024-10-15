const mongoose = require('mongoose')

const userSchema = new mongoose.Schema([{

    userName: {
        type: String,
        required: false
    },
    phoneNumber:{
        type: Number,
        required: true,
        // unique: true,
    },
    email: {
        type: String,
        required: false,
        // unique: true
    },
    role :{
        type : String,
        required: true,
    },
    profilePicture: { 
        type: String,
        required: false,
        default : "public/static/assets/profile-png.png"
    },

    buisnessName: {
        type : String,
        required: false,
        default : "Buisness Name"
    },    

    buisnessAdress: {
        type : String,
        required: false,
        default : "Buisness Address"
    },
    token : {
        type : String,
        required : false,
        default : ""
    },
    Subscription_isActive: {
        type: Boolean,
        default: false,
        
    },
  
    
}])






const userModel= mongoose.model('user', userSchema);

module.exports =userModel;