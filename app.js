const express = require('express');
const mongoose=require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const pageRoute=require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute= require("./routes/userRoute");
const app=express();

// Connect DB
mongoose.connect('mongodb://localhost/smartedu-db',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFİndAndModify:false,
    // useCreateIndex:true,
}).then(()=>{
    console.log('DB Connected Successfuly')
});

//Template Engine
app.set("view engine", "ejs");


//Global Variable

global.userIN= null;



//Middlewares 

app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
}));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.flashMessages= req.flash();
    next();
})

app.use('*', (req, res, next) =>{
    userIN=req.session.userID;
    next();
})

//Routes
app.use('/', pageRoute );
app.use('/courses', courseRoute );
app.use('/categories', categoryRoute  );
app.use('/users', userRoute  );

// app.get('/about', pageRoute);


const port=3000;
app.listen(port, ()=>{
    console.log(`App started on port ${ port }`)
}) ;

