const userModel = require('../Model/userModel.js');
const Otp = require('../Model/otpModel.js');
const categoryModel = require('../Model/categoryModel.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const multer = require('multer');
const QRCode = require('qrcode');
const path = require('path');
const dotenv = require('dotenv');
const Job = require('../Model/jobModel.js'); // Assuming you have a Job model to save the job details
const jobModel = require('../Model/jobModel.js');
const bidModel = require('../Model/bidModel.js');
const { console } = require('inspector');

dotenv.config()

// Set up storage location for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/static/Assets/uploads/jobImages') // Directory where the images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Rename the file with timestamp to avoid overwrites
    }
});

// Multer configuration
const upload = multer({ storage: storage });






// Route to handle job creation
const createJob =  async (req, res) => {
    try {
        // Gather the data from the form    
        console.log(`Req body : ${JSON.stringify(req.body)}`)
        console.log(`User : ${req.user}`)
        const { jobName, category, urgency, description, additionalRequirements  } = req.body;
        const jobCategory = await categoryModel.findOne({ categoryName :category });
        

        // Collect all the uploaded image paths
        const imagePath = req.file ? req.file.path : null;

        // Save job details in MongoDB
        const newJob = new jobModel({

            jobName,
            category : jobCategory._id,  // Match the field name with the model
            urgency,
            images: imagePath, // Ensure images is an array
            description,
            additionalRequirements, 
            postedBy: req.user._id, 
            
        });

        await newJob.save(); // Save to the database

        res.json({ success: true, message: 'Job posted successfully!' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error posting job: ' + error.message });
    }
}

const getAllPendingJobs =async  (req, res) => {

    try {
        // Fetch all jobs from the database
        const allJobs = await jobModel.find({completionStatus : "pending"}).populate('category postedBy');
        console.log(allJobs);


        res.json({ success: true, message: 'Jobs retrieved successfully!', jobs: allJobs });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

     }
};


const getOneSeekerAllJobs = async (req, res) => {

    try {
        console.log("getSeekerAllJobs API Hit")

        // Fetch all jobs from the database
        const allSeekerJobs = await jobModel.find({ postedBy: req.user._id }).populate('category postedBy');
        console.log(req.user._id)
        console.log(allSeekerJobs);
        res.json({ 
            success: true, 
            message: 'Seeker jobs retrieved successfully!', 
            jobs: allSeekerJobs });


    }catch(error)
    {
        console.log(error)

        res.json({
            success: false,
            message: 'Error fetching seeker jobs'
            
        })
    }
}


const getOneSeekerCompletedJobs = async (req, res) => {

    try {
        console.log("getSeekerAllCompletedJobs API Hit")
        // Fetch completed jobs from the database
        const SeekerCompletedJobs = await jobModel.find({ postedBy: req.user._id, completionStatus: "completed" }).populate('category postedBy');

        res.json({ 
            success: true, 
            message: 'Completed jobs retrieved successfully!', 
            jobs: SeekerCompletedJobs });


    }catch(error)
    {
        console.log(error)

        res.json({
            success: false,
            message: 'Error fetching completed jobs'
            
        })
    }


}


const getOneSeekerPendingJobs = async (req, res) => {

    try {
        console.log("getSeekerAllJobs API Hit")
        // Fetch Pending jobs from the database
        const SeekerPendingJobs = await jobModel.find({ postedBy: req.user._id, completionStatus: "pending" }).populate('category postedBy');
        res.json({ 
            success: true, 
            message: 'Pending jobs retrieved successfully!', 
            jobs: SeekerPendingJobs });


    }catch(error)
    {
        console.log(error)

        res.json({
            success: false,
            message: 'Error fetching pending jobs'
            
        })
    }


}


const getOneSeekerCanceledJobs = async (req, res) => {

    try {
        console.log("getSeekerAllJobs API Hit")
        // Fetch completed jobs from the database
        const SeekerCanceledJobs = await jobModel.find({ postedBy: req.user._id, completionStatus: "canceled" }).populate('category postedBy');
        res.json({ 
            success: true, 
            message: 'Canceled jobs retrieved successfully!', 
            jobs: SeekerCanceledJobs });


    }catch(error)
    {
        console.log(error)

        res.json({
            success: false,
            message: 'Error fetching canceled jobs'
            
        })
    }


}

const canceledJob = async (req, res) => {


    console.log("CanceledJob API Hit")
    console.log(req.body)
    try {
        // Fetch the job
        const job = await jobModel.findByIdAndUpdate(req.body.jobId, { completionStatus: "canceled" }, { new: true });
        console.log(job)

        res.json({ 
            success: true, 
            message: 'Job canceled successfully'
         });
        

    }catch(err) {

        res.json({ 
            success: false, 
            message: 'Error cancelling job',
            error: err.message
         });


    }
}

const markAsCompleted = async (req, res) => {


    console.log("markAsCompleted API Hit")
    console.log(req.body)
    try {
        // Fetch the job
        const job = await jobModel.findByIdAndUpdate(req.body.jobId, { completionStatus: "completed" }, { new: true });
        console.log(job)

        res.json({ 
            success: true, 
            message: 'Job marked as completed '
         });
        

    }catch(err) {

        res.json({ 
            success: false, 
            message: 'Error marking job as completed: ',
            error: err.message
         });


    }
}


const getProviderActiveJobs = async (req, res) => {

    console.log("getProviderActiveJobs api hit")
    try{

        // Fetch all jobs from the database
        const ProviderActiveJobs = await jobModel.find({ provider: req.user._id, bidStatus : "accepted", completionStatus : "pending"}).populate('category postedBy');
        console.log("Active jobs: "+ ProviderActiveJobs)
        

        res.json({ 
            success: true, 
            message: 'Provider active jobs retrieved successfully!', 
            jobs: ProviderActiveJobs });


}catch(err) {

        console.error(err);
        res.json({ 
            success: false, 
            message: 'Error fetching provider active jobs',
            error: err.message
         });

        };
    
}

const getProviderCompletedJobs = async (req, res) => {


    console.log("getProviderCompletedJobs api hit")
    try {
        // Fetch all jobs from the database
        const CompletedJobs = await jobModel.find({ provider: req.user._id, bidStatus : "accepted" , completionStatus : "completed"}).populate('category postedBy');
        // console.log(CompletedJobs);

        res.json({ 
            success: true, 
            message: 'Provider completed jobs retrieved successfully!', 
            jobs: CompletedJobs });


}catch(err) {


        res.json({ 
            success: false, 
            message: 'Error fetching provider completed jobs',
            error: err.message
         });

        };
    
}

const getProviderBidPostedJobs = async (req, res) => {


    console.log("getProviderBidPostedJobs api hit")
    
    try {
        // Fetch all jobs from the database
        const bidPostedJobs = await bidModel
    .find({ postedBy: req.user._id })
    .populate({
      path: 'job',
      populate: [
        { path: 'category' },
        { path: 'postedBy' },
      ],
    });
       

        res.json({ 
            success: true, 
            message: 'Provider bid posted jobs retrieved successfully!', 
            jobs: bidPostedJobs });


}catch(err) {

    console.log(err);
        res.json({ 
            success: false, 
            message: 'Error fetching provider bud posted jobs',
            error: err.message
         });

        };
    
}


module.exports = {
    
    createJob,
    upload,
    getAllPendingJobs,
    getOneSeekerAllJobs,
    getOneSeekerCompletedJobs,
    getOneSeekerPendingJobs,
    getOneSeekerCanceledJobs,
    canceledJob,
 markAsCompleted,
    getProviderActiveJobs,
    getProviderCompletedJobs,
    getProviderBidPostedJobs

};
