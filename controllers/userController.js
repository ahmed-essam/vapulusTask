const express = require('express');
const router = express.Router();
const UserService = require("../services/userService");
const validation = require('./../middlewares/validation');
const auth = require('./../middlewares/auth')
const config= require("../config.js");

router.post("/register",validation,function (request,response){
    
    UserService.register(request).then(user=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = user;
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
    
    UserService.login(request).then(user=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = user;
        response.json(config.responseFormate);
    }).catch(error=>{
        response.status(400);
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error;
        config.responseFormate.data={};
        response.json(config.responseFormate);
    })
});

router.get("/:username?",auth,function (request,response){
    
    UserService.getUser(request).then(user=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = user;
        response.json(config.responseFormate);
    }).catch(error=>{
        response.status(400);
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error;
        config.responseFormate.data={};
        response.json(config.responseFormate);
    })
});
module.exports = router;
