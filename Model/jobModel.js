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
        type : Array,
        required: false,
    },
    description: { 
        type: String,
        required: false,
       
    },

    AdditionalInformation: {
        type : String,
        required: false,
        
    }, 
    postedBy :{

        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    provider :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },

  

  
    
}])






const jobModel= mongoose.model('job', ,jobSchemaSchema);

module.exports =jobModel;