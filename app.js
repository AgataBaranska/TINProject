//imports
const express = require('express');
const app = express();
const port= 3000;
const mongoose = require('mongoose');
const Product = require('./models/product');
//connect to MangoDb
const dbURI ='mongodb+srv://TINUser:1234Qwer@tincluster.mpshl.mongodb.net/TINProject?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>app.listen(port, ()=>{console.log(`Listening on port ${port}`)}))
.catch((err)=> console.log(err));
//static files
app.use(express.static('public'));

//register view engine
app.set('view engine','ejs');
app.get('/',(req,res)=>{
res.render('index');
});


app.get('/add-product',(req,res)=>{
const product = new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Glasses_black.jpg/1280px-Glasses_black.jpg',
    model:'Spoko model',
    price: 2300
})

product.save()
.then((result)=>{
    res.send(result)
})
.catch((err)=>{
    console.log(err);
})
});


app.get('/products',(req,res)=>{
Product.find()
.then((products)=>{
    res.render('products',{products})
})
.catch((err)=>{
    console.log(err);
});
})

app.get('/product')



app.get('/about',(req,res)=>{
    res.render('about');
    });


app.use((req,res)=>{
    res.status(404).render('404');
    });


