var mongoose = require('mongoose');
var mongoose_paginate= require("mongoose-paginate");

//ORM mapping ...
var Schema = mongoose.Schema;

var contacts = new Schema({

    email:String,
    mobile:{
        type:Number,
        required:true,
        min:11
    },
    firstName:{
        type:String,
        required:true,
    },
    LastName:String,
    userId:{
        type:Number
    }

});

contacts.plugin(mongoose_paginate);
//DB register
var Contact = mongoose.model("contacts",contacts);

exports.Contact = Contact;

function validateEmail(email) {
    var regularExpretion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpretion.test(String(email).toLowerCase());
}

exports.addContact= function(contactData){

    var contact = new Contact(contactData);
    return new Promise((resolve ,reject) => {

        if(contactData.email && !validateEmail(contactData.email)){
            reject("not valid email");
        }
        else
        {
        contact.save().then( contact =>{
            console.log(contact);
            resolve(contact);
        })
        .catch( error =>{
            console.log(error);            
            reject(error);
        })
        }
    })
}

exports.getContacts = function(user,page){

    var query = {userId:user};
    var optionss = {
      page: page,
      limit: 10
    };
    return new Promise((resolve,reject)=>{
        Contact.paginate(query,optionss).then(data=>{

            console.log('get all',data.docs);
            resolve(data.docs);

        }).catch(error => {

            console.log('get all',error);
            reject(error);

        })
    })
}

exports.getRecentContacts = function(user){

    return new Promise((resolve, reject) => {

        Contact.find({userId:user})
        .sort({_id:-1})
        .limit(5)
        .then(data=>{

            console.log("recent data",data);
            resolve(data);

        }).catch(error=>{

            console.log("recent error",error);
            reject(error);

        })
    })
    

}


