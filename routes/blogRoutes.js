var express         = require('express'),
    Blog            = require("../models/blogModel"),
    User = require('../models/userModel')
    router          = express.Router();
router.get('/addNewBlog',(req,res)=>{
    res.render('blog/newBlog.ejs')
})
router.post("/addNewBlog", function(req, res){
    var createdBy = req.body.data?.createdBy;
    var title = req.body.data?.blogTitle;
    var subTitle = req.body.data?.blogSubTitle;
    var comImage = req.body.data?.comImage;
    var video = req.body.data?.video
    var blog = req.body.data?.blog;

    var newBlog = {createdBy:createdBy,title:title, subTitle:subTitle, comImage:comImage,video:video, blog:blog }

    Blog.create(newBlog)
    .then((newAddedBlog)=>{
        console.log(newAddedBlog);
        res.status(201).json(newAddedBlog);
    })
    .catch(function(err){
        console.log("======================= ERROR ===========================");
        console.log(err);
        res.send(err);
    })

});
router.get("/blogs/:blogId", function(req,res){
    console.log(req.params.blogId);

    Blog.findById(req.params.blogId)
    .then(function(foundBlog){
        res.render("blog/showBlog",{foundBlog:foundBlog});
    })
    .catch(function(err){
        console.log(err);
        res.send(err);
    })
});
router.delete("/blogs/delete",  function(req, res){
const  deleteById= (blogId)=>{
const deleteBlogIndex = Blog.findIndex(b=>b.blogId ===blogId)
Blog.splice(deleteBlogIndex,1)
}
const deleteBlog= (req,res,next)=>{
    Blog.deleteById(req.params.blogId)
    console.log(req.params.blogId)
}
})
router.post("/blogs/:blogId",  function(req, res){
    Blog.findByIdAndRemove(req.params.blogId, function(err){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});

  
router.get("/testing", function(req,res){
    Blog.find().then((foundBlogs)=>{
        res.json(foundBlogs)
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    }
    )
});

module.exports = router