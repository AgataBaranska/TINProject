var Product = require('../models/product');

var mongoose = require('mongoose');
const dbURI ='mongodb+srv://TINUser:1234Qwer@tincluster.mpshl.mongodb.net/TINProject?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true});

products = [
new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Glasses_black.jpg/1280px-Glasses_black.jpg',
    model:'Vegas-123',
    price:1200
    }),
new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Glasses_black.jpg/1280px-Glasses_black.jpg',
    model:'Vegas-123',
    price:1200
    }),
new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Glasses_black.jpg/1280px-Glasses_black.jpg',
    model:'Vegas-123',
    price:1234
}),
new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Glasses_black.jpg/1280px-Glasses_black.jpg',
    model:'Prada-2390',
    price:1300
    })
];

var done = 0;
for(var i =0; i<products.length; i++){
    products[i].save((err,result)=>{
        done++;
        if(done===products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}