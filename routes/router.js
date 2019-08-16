var express = require('express');
var router = express.Router();
var UserController = require("./../controllers/userController");
var PostController= require("./../controllers/postController");
const auth = require('./../middlewares/auth')




router.use(function(request,response,next){
    response.header("Access-Control-Allow-Origin","*");
    response.header("Access-Control-Allow-Headers","Content-Type");
    response.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    next();
});

router.use("/user",function(req, res, next){
    next();
},UserController);

router.use("/post",auth,PostController);
// router.use("/quiz",function(req, res, next){
//     next();
// },quizeControler);
// router.use("/question",questionControler);


module.exports = router;