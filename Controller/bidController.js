const userModel = require('../Model/userModel.js');
const Otp = require('../Model/otpModel.js');
const categoryModel = require('../Model/categoryModel.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const multer = require('multer');
const QRCode = require('qrcode');
const path = require('path');
const dotenv = require('dotenv');
const jobModel = require('../Model/jobModel.js');
const bidModel = require('../Model/bidModel.js');


const postBid = async (req, res) => {

    console.log('PostJob API Hit')
    try{

        const job = await jobModel.findById(req.body.jobId);
        console.log(job)
        const newBid = new bidModel({
            job: job._id,
            offerPrice: req.body.offerPrice,
            description: req.body.description,
            postedBy: req.user._id,
           
        });

        await newBid.save(); // Save to the database

        res.json({
            success: true,
            message: 'Bid Posted Successfully',
            bid: newBid,
            })
    
    }catch(err){

        res.json({
        success: false,
        message: 'Error posting Bid',
        Error : err.message,

        })

    }

};

const getOneJobBids = async (req,res)=>{

    console.log("getOneJobBids  api hit !!")
    console.log(req.body)
    try{

    const bids = await bidModel.find({job : req.body.job}).populate('job postedBy');
    console.log("Job Details and Bids:")
    console.log(bids)
    if(bids.length > 0){
    res.json({

        message : "Bids Fetched successfully",
        success: true,
        bids: bids,

    })
}else{

    res.json({

        message : "No Bids posted for this job",
        success: true,
        bids: [],

    })

}
    
    }catch(error){
        res.json({

            message : "Error Fetching Bids",
            success: false,
            error : error.message,
            
        })


    }
    
    


}


const acceptedBids = async (req, res) => {

    console.log('acceptedBids API Hit')
    console.log(req.user)
    try{

        const bid = await bidModel.findById(req.body.bidId)
        console.log(bid)
        const otherBids = await bidModel.find({job : bid.job})
        // console.log(otherBids)
        let isAccepted = false;

        for(let i=0; i<otherBids.length; i++){

            if(otherBids[i].status === "accepted"){

                
                isAccepted = true;
                break;

            }else{

                isAccepted = false;


            }
        }

        if(isAccepted){

            res.json({

                success: true,
                message: 'Other Bid Already Accepted',
            
                })
        }else{

        
        const acceptedBid=  await bidModel.findByIdAndUpdate(req.body.bidId, {status: "accepted"});
        await jobModel.findByIdAndUpdate(bid.job, { provider: bid.postedBy , bidStatus: "accepted", acceptedBid : bid._id  });
        res.json({

            success: true,
            message: 'Bid successfully accepted',
            bid : acceptedBid
        
            })



        }


       
        

        // res.json({
        //     success: true,
        //     message: 'Bid Accepted Successfully',
        //     bid: bid,

        //     })

    }catch(err) {

        console.log(err);
        res.json({
            success: false,
            message: 'Error accepting Bid',
            Error : err.message, });

    };
};



module.exports = {

     postBid,
     getOneJobBids,
     acceptedBids,
     
}