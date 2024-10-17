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
    status :{

        type : String,
        required: true,
        enum: ['pending', 'active', 'completed', 'cancelled'],
        default : 'pending',
    },
    provider :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: false,
    },

  

  
    
}])






const jobModel= mongoose.model('job',jobSchema);

module.exports =jobModel;