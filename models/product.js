const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    imagePath:{
        type:String,
        required:true,
    },
    model: {
        type: String,
        required:true
    },
    price: {
        type:Number,
        required:true
    }
},{timestamps:true});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;