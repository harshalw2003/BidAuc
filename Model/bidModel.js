const mongoose = require('mongoose')

const bidSchema = new mongoose.Schema([{

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'job',
        required: true,

    },
    offerPrice : {
        type: Number,
        required: true,
    },
    description: { 
        type: String,
        required: true,
        default : "No Description"
       
    },
    postedBy :{

        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true,
    },
    status :{
        type : String,
        required: true,
        enum: ['unaccepted', 'accepted'],
        default : 'unaccepted',
    },
    timePosted : {
        type : Date,
        default : Date.now,
        required : true,
    },

  

  
    
}])






const bidModel= mongoose.model('bid',bidSchema);

module.exports =bidModel;