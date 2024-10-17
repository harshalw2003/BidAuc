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
            images: imagePath , // Ensure images is an array
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

const getAllJobs =async  (req, res) => {

    try {
        // Fetch all jobs from the database
        const allJobs = await jobModel.find().populate('category postedBy');
        console.log(allJobs);


        res.json({ success: true, message: 'Jobs retrieved successfully!', jobs: allJobs });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });    }
};

module.exports = {
    
 createJob,
 upload,
 getAllJobs
};
