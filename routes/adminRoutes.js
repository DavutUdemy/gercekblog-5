const express = require('express')
const router = express.Router();
const User = require('../models/userModel')
const passport = require('passport')
let adminActions = [{
    actionId: 1,
    actionName: 'Change Home Image',
    displayName: 'Change Home Image'

}, {
    actionId: 2,
    actionName: 'ChangeAbout Image',
    displayName: 'Change About Image'


}, {
    actionId: 3,
    actionName: 'ChangeAboutText',
    displayName: 'Change About Text'



}, {
    actionId: 4,
    actionName: 'addNewBlog',
    displayName: 'Add New Blog'


}, {
    actionId: 5,
    actionName: 'listAllBlogs',
    displayName: 'List All Blogs'
}
]




    
  




router.get('/signin',(req,res)=>{
    res.render('admin/signin')
})
router.get('/signup',isLoggedIn,(req,res)=>{
    res.render('admin/signup')
})
router.post('/signup', isLoggedIn,function(req, res){
    // console.log(req.body)
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect('/signup');
        } 
        passport.authenticate("local")(req, res, ()=>{
            res.redirect("/");
        });
    });
});
router.post("/signin", passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/signin"
    }), function(res, req){
});
router.get('/admin',(req,res)=>{
    res.render('admin/admin',{adminActions:adminActions})
})
router.get('/signout',(req,res)=>{
    req.logout()
    res.redirect('/')
})
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
}


module.exports = router