var express = require('express');
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var jsonParser = bodyParser.json();
var router = express.Router();
var fs = require("fs");
var mongoose = require("mongoose");
var contactModel = require("../models/contacts");
var config= require("../config.js");

router.use(function(request,response,next){
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers","Content-Type");
    response.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    next();
});


router.post("/getlist/",urlEncodedMid,function (request,response){
    
    var page = request.body.page ? request.body.page:1;
    contactModel.getContacts(request.body.userId,page).then(data=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = data;
        response.json(config.responseFormate);

    }).catch(error=>{
        response.status(400);
        response.locals.message = error.message;
        response.locals.error = error;
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error;
        config.responseFormate.data=[];
        response.json(config.responseFormate);
    })
});

router.post("/addContact",urlEncodedMid,function (request,response,next){

    var contact = request.body;
    contactModel.addContact(contact).then(data=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = data;
        response.json(config.responseFormate);

    }).catch(error=>{
        response.status(400);
        response.locals.message = error.message;
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error;
        config.responseFormate.data=[];
        response.json(config.responseFormate);
    })
});

router.post("/getRecentList",urlEncodedMid,function (request,response){
    
    contactModel.getRecentContacts(request.body.userId).then(data=>{
        config.responseFormate.statusCode=200;
        config.responseFormate.message = "success request";
        config.responseFormate.data = data;
        response.json(config.responseFormate);

    }).catch(error=>{
        response.status(400);
        response.locals.message = error.message;
        config.responseFormate.statusCode=400;
        config.responseFormate.message = error;
        config.responseFormate.data=[];
        response.json(config.responseFormate);
    })
});

module.exports = router;
