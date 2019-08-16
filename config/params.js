module.exports = {
    "/user/register":{
        email:true,
        userName:true,
        firstName:true,
        lastName:true,
        password:true
    },

    "/user/login":{
        email:true,
        password:true
    },

    "/post/create":{
        body:true,
        tags:false,
        mentions:false,
    },
}