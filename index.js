const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();
dotenv.config()
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));

//importing Routes
const homeRoutes = require('./Routes/homeRoutes.js');
const userRoutes = require('./Routes/userRoutes.js'); 
const dashboardRoutes = require('./Routes/dashboardRoutes.js');
const categoryRoutes = require('./Routes/categoryRoutes.js');
const jobRoutes = require('./Routes/jobRoutes.js');
const bidRoutes = require('./Routes/bidRoutes.js');

//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(homeRoutes)
app.use('/user',userRoutes)
app.use('/dashboard',dashboardRoutes)
app.use('/category',categoryRoutes)
app.use('/job',jobRoutes)
app.use('/bid',bidRoutes)

const connectDb = async () => {
    try {

        await mongoose.connect("mongodb://localhost:27017/BidAuc")
        console.log("Connection  to DB Successfull")

    } catch (err) {

        console.log("Connection  to DB failed")

    }
}


//payment gateway Integration
{
 //Replace with your Razorpay credentials 
const razorpay = new Razorpay({ 

    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,

    });


// Function to read data from JSON file

const readData = () => {

    if (fs.existsSync('orders.json')) {
    
    const data =  fs.readFileSync('orders.json');
    return JSON.parse(data);
    
    } return []; 
};
    
    // Function to write data to JSON file
    
    const writeData = (data) => {
    
    fs.writeFileSync('orders.json', JSON.stringify(data, null, 2));
    
    };
    
    // Initialize orders.json if it doesn't exist
    
    if (!fs.existsSync('orders.json')) {
    
    writeData([]);
    
    }


    // Route to handle order creation

app.post('/create-order', async (req, res) => {

    try {

    const {amount, currency, receipt, notes } =  req.body;
    
    const options = {
    amount: amount *100, // Convert amount to paise
    currency,
    receipt,
    notes,   
    };
    
    const order = await razorpay.orders.create(options);
    
    // Read current orders, add new order, and write back to the file
    
    const orders =  readData();

    orders.push({

    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
    status: 'created',
    
    });
    
    writeData(orders);
    res.json(order); // Send order details to frontend, including order ID
    
}catch(error){
    
    console.error(error);
    res.status(500).send("Error creating order");
    
    }
    
    });

app.get('/payment-success', (res,req) =>{

    res.sendFile(path.join(__dirname, '../public/Templates' ,'success.html'));


})

}


app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);

         });

//Connect to db
connectDb()


const serverUp = () => {

    console.log("Server is up and running at port " + port)
    
}

app.listen(port, serverUp)