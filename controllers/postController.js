const express = require('express');
const router = express.Router();
const PostService = require("../services/postService");
const validation = require('./../middlewares/validation')
const config= require("../config.js");

router.post("/create",validation,function (request,response){
    
    PostService.create(request).then(post=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = post;
        response.json(config.responseFormate);

    }).catch(error=>{
        response.status(400);   
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error;
        config.responseFormate.data={};
        response.json(config.responseFormate);
    })
});

router.post("/login",validation,function (request,response){
    
    UserService.getPost(request).then(post=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = post;
        response.json(config.responseFormate);
    }).catch(error=>{
        response.status(400);
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error;
        config.responseFormate.data={};
        response.json(config.responseFormate);
    })
});


router.get("/list/:tag?",validation,function (request,response){
    
    PostService.list(request).then(posts=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = posts;
        response.json(config.responseFormate);
    }).catch(error=>{
        response.status(400);
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error.message;
        config.responseFormate.data={};
        response.json(config.responseFormate);
    })
});

router.get("/myList",validation,function (request,response){
    
    PostService.getMyPosts(request).then(posts=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = posts;
        response.json(config.responseFormate);
    }).catch(error=>{
        response.status(400);
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error.message;
        config.responseFormate.data={};
        response.json(config.responseFormate);
    })
});

router.get("/:id?",validation,function (request,response){
    
    PostService.getPost(request).then(post=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = post;
        response.json(config.responseFormate);
    }).catch(error=>{
        response.status(400);
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error.message;
        config.responseFormate.data={};
        response.json(config.responseFormate);
    })
});
module.exports = router;
