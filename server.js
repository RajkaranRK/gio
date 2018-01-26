

const express = require('express');
const hbs = require('hbs');

var app  = express();
app.use(express.static(__dirname+'/public/'));
app.use((req,res,next)=>{
    var now = new Date().toDateString();
    var log = `${now} : URL: ${req.url} Method:${req.method}`;
     next();
});
var port = process.env.PORT||3000;

app.use('/user/:userId',(req,res,next)=>{

    console.log(req.params);
    console.log(req.params.userId);
    
    if(req.params.userId == '1234'){
        next();
    }
    else{
        res.render('unknown.hbs');
    }
});

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.get('/',(request,response)=>{
    response.render('home.hbs',{
        userName:'Minions....',
        date: new Date().getDate(),
        year:new Date().getFullYear()
    });
});

app.get('/flight/:from-:to',(req,res)=>{
    console.log(req.params);
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'This is an About Page',
        year:new Date().getFullYear()
    });
});

app.get('/user/:userId',(req,res)=>{

    console.log(req.params);
    res.send({
        status_ok:"Ok I got it"
    });
});

app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        userName:'Rajkaran'
    });
});

app.listen(port,()=>{
    console.log('App is listening at port ',port);
});