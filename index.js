const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
dotenv.config()
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));

//importing Routes
const homeRoutes = require('./Routes/homeRoutes.js');
const userRoutes = require('./Routes/userRoutes.js'); 
const dashboardRoutes = require('./Routes/dashboardRoutes.js');
const categoryRoutes = require('./Routes/categoryRoutes.js');
const jobRoutes = require('./Routes/jobRoutes.js');




//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(homeRoutes)
app.use('/user',userRoutes)
app.use('/dashboard',dashboardRoutes)
app.use('/category',categoryRoutes)
app.use('/job',jobRoutes)




const connectDb = async () => {
    try {

        await mongoose.connect("mongodb://localhost:27017/BidAuc")
        console.log("Connection  to DB Successfull")

    } catch (err) {

        console.log("Connection  to DB failed")

    }
}

//Connect to db
connectDb()


const serverUp = () => {

    console.log("Server is up and running at port " + port)
}

app.listen(port, serverUp)