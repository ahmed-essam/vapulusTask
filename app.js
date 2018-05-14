
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();
var mongoose = require("mongoose");
var fs = require('fs');
var path = require('path');
var config= require("./config");


//connect to database
mongoose.connect("mongodb://localhost:27017/contacts");

//require models
fs.readdirSync(path.join(__dirname, "models")).forEach(function (filename) {
  require('./models/' + filename);
});


server.use(jsonParser);




//contacts route
var contactsRouter = require('./controllers/contactsController');
var auth = require('./controllers/authController');

// check Auth Users 
server.use(urlEncodedMid, function (request, response, next) {
  try {
    var authorized = auth.CheckAuthorization(request.body);
    request.body.userId = authorized;
    console.log(request.body.userId);
    next();
  } catch (error) {
    response.status(401);
    config.responseFormate.statusCode=401;
    config.responseFormate.message = error.message;
    config.responseFormate.data=[];
    response.json(config.responseFormate);
  }

});

//redirect route to contacts
server.use('/contacts', contactsRouter);


// catch 404 and forward to error handler
server.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
server.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);

});


server.listen("9090");