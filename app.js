
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();
var mongoose = require("mongoose");
const Sequelize = require('sequelize');
const expressSession = require('express-session');

var path = require('path');
var router = require('./routes/router');
var config= require("./config");

//setup session 
server.use(expressSession({
  secret:"GOTsessionKey"
}));

//body pase middlewares
server.use(jsonParser);

server.use(urlEncodedMid);

//redirect to router
server.use('/', router);


// catch 404 and forward to error handler
server.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

server.listen("9090",()=>{
  console.log("server is on .........");
});