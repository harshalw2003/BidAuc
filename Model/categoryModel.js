const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema([{

    categoryName: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type : String,
        required: true,
    },
    subcategories:[{
        type: Array,
       required: false,
    }]
    
}])

const categoryModel= mongoose.model('category', categorySchema);

module.exports =categoryModel;