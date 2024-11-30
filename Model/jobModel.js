const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema([{

    jobName: {
        type: String,
        required: true,
        unique: true,

    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'category'

    },
    urgency: {
        type: String,
        required: false,
        
    },
    images :{
        type : String,
        required: false,
    },
    description: { 
        type: String,
        required: true,
        default : "No Description"
       
    },
    additionalRequirements: {
        type : String,
        required: true,
        default : "No Additional Requirements"
        
    }, 
    postedBy :{

        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true,
    },
    completionStatus :{

        type : String,
        required: false,
        default : 'pending',
    },
    bidStatus :{

        type : String,
        required: false,
        // enum: ['accepted', 'unaccepted'],
        default : 'unaccepted',
    },
    provider :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: false,
    },

    acceptedBid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'bid',
        required: false,

    },
    timePosted : {
        type : Date,
        default : Date.now,
        required : true,
    },

  

  
    
}])






const jobModel= mongoose.model('job',jobSchema);

module.exports =jobModel;