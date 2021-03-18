const mongoose = require('mongoose')
const express = require('express')
const app = express()
const User = require('./models/userModel')
var expressSession = require('express-session')
const LocalStrategy = require('passport-local')
var nodemailer = require('nodemailer')
var bodyparser = require('body-parser')
const indexRoutes = require('./routes/indexRoutes.js')
const adminRoutes = require('./routes/adminRoutes')
const passport = require('passport')
const blogRoutes = require('./routes/blogRoutes')
const connection_url ='mongodb+srv://blog:blog123@cluster0.h02kl.mongodb.net/Solomans?retryWrites=true&w=majority'
app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
mongoose.connect(connection_url, {
    // to connect smoothly to my mongodb
  
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
   db.once("open", () => {
    console.log("DB connected");
  
  
  
      
  }); 
  app.get('/ThankYou',(req,res)=>{
      res.render('ThankYou')
  })

  app.post('/contact',(req,res)=>{
      console.log(req.body)
      const transporter = nodemailer.createTransport({
          service:'gmail',
          auth:{
              user:'davutmamedov2007@gmail.com',
              pass: 'testcontact123'

          }
      })
      const mailOptions = {
          from:req.body.email,
          to:'davutmamedov2007@gmail.com',
          subject:`Message from ${req.body.email}: ${req.body.subject}`,
          text: req.body.text

      }
      transporter.sendMail(mailOptions,(err,info)=>{
          if(err){
              console.log(err)
              res.send(err)
          }
          else{
              console.log('Succesfully everything working')
              res.send('succes')
          }
      })
  })
app.set('view engine','ejs');
app.use(express.static('public'))

app.use(require("express-session")({
    secret:"this is our secret sentence",
    resave:false,
    saveUninitialized:false
}));
router.get('/contact',(req,res)=>{
    res.render('contact')
})

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//kaydolmus adamlari gosteriyor
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes)
app.use(blogRoutes);

app.use(adminRoutes)


const PORT  = process|env
const server = app.listen(PORT, function(err){
    if(err){
        console.log(err);
    }
    console.log('App Started. Port Number: 4000');
});
