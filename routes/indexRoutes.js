const express = require('express')
const router = express.Router();
 const Blog = require('../models/blogModel')
router.get('/',(req,res)=>{
Blog.find({},(err,foundBlog)=>{
    if(err){
        console.log(err)

    }
    else
    {
        res.render('home',{foundBlog:foundBlog})
    }
})
})
router.get('/contact',(req,res)=>{
    res.render('contact')
})
router.get('/about',(req,res)=>{
  res.render('about')
})

module.exports = router