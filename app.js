//imports
const express = require('express');
const app = express();
const port= 3000;

//static files
app.use(express.static(__dirname+'style'));
app.use(express.static(__dirname+'img'));

//register view engine
app.set('view engine','ejs');
app.get('/',(req,res)=>{
res.render('index');
});

app.get('/products',(req,res)=>{
const products =[ 
    {model:'PR-1234', price:'29.90'},
    {model:'OPR-1534', price:'33.90'},
    {model:'DG-1634', price:'90.90'},
];
    res.render('products',{products});
    });

app.get('/about',(req,res)=>{
    res.render('about');
    });


app.get('/about-us', (req, res)=>{
    res.redirect('/');
});


app.get('/about',(req,res)=>{
    res.status(404).render('404');
    });

app.listen(port, ()=>{console.log(`Listening on port ${port}`)});

