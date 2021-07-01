//imports
const express = require('express');
const app = express();
const port= 3000;
const mongoose = require('mongoose');
const Product = require('./models/product');
const { body, validationResult } = require('express-validator');
const user = require('./models/user');


//connect to MangoDb
const dbURI ='mongodb+srv://TINUser:1234Qwer@tincluster.mpshl.mongodb.net/TINProject?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>app.listen(port, ()=>{console.log(`Listening on port ${port}`)}))
.catch((err)=> console.log(err));
//static files
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));
//register view engine
app.set('view engine','ejs');
app.use(express.json());


app.get('/',(req,res)=>{
res.render('index');
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

//product details, np. http://localhost:3000/products/60dce7df9bad1573348198c7
app.get('/products/:id', async (req, res) => {
const productId = req.params.id;
console.log(productId);
try {
var ObjectId =new mongoose.Types.ObjectId;  
console.log(ObjectId);
var product = await Product.findById(ObjectId).exec();
console.log(product);
} catch (error) {
   console.log(error); 
}
});

app.get('/cart', (req,res)=>{
    res.render('cart');
});

app.post('/cart', (req,res)=>{
const productId = req.body.productId;
Product.findById(productId)
.then(product =>{
    return req.user.addToCart(product);
})
.then(result=> {
    console.log(result);
    res.redirect('/cart');
})
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/user/login', (req,res)=>{
res.render('user/login')
});

app.post('/user/login',
body('email').isEmail().withMessage('Invalid email typed'),
body('password').isLength({ min: 5 }).withMessage('must be at least 5 characters long')
.matches(/\d/).withMessage('must contain a number'),
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

});

//template
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


app.use((req,res)=>{
    res.status(404).render('404');
});


