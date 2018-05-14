var express = require('express');
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();
var router = express.Router();
var fs = require("fs");


//check that the user exist in the file 
exports.CheckAuthorization = function (headers) {
    var authorization = headers.authorization;
    var deviceToken = headers.deviceToken;
    var fingerPrint = headers.fingerPrint;

    if (authorization && deviceToken && fingerPrint) 
    {
        var content = fs.readFileSync("./users.txt").toString();
        var users = JSON.parse(content);
        for (let i = 0; i < users.length; i++) 
        {
            element = users[i]
            if (element.authorization == authorization && 
                element.deviceToken == deviceToken && 
                element.fingerPrint == fingerPrint) 
            {
                return ++i;
            }
        };
        throw new Error("not Athorized");
    }
    else {
        throw new Error("not Athorized");
    }

}

