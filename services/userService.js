const { User } = require('./../DB');
const bcryptjs = require('bcryptjs');
var salt = bcryptjs.genSaltSync(10);

// function validateQuiz(req.body) {
//     var regularExpretion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return regularExpretion.test(String(email).toLowerCase());
// }

module.exports = {
    register: async function (req) {
        try {
            req.body.password = bcryptjs.hashSync(req.body.password, salt);
            var result = await User.create(req.body)
            var hour = 3600000
            req.session.cookie.expires = new Date(Date.now() + hour)
            req.session.cookie.maxAge = hour
            req.session.islogged = true;
            req.session.userId = result.id;
            delete result.dataValues.password;
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject("username or email used before");
        }
    },

    login: async function (req) {
        try {
            var hash = bcryptjs.hashSync(req.body.password, salt);
            var result = await User.findOne({
                where: { email: req.body.email }
            }, req.body);
            if (result.length == 0)
                return Promise.reject("fail to find User");
            var valied = bcryptjs.compareSync(req.body.password, result.password);
            if (valied) {
                var hour = 3600000
                req.session.cookie.expires = new Date(Date.now() + hour)
                req.session.cookie.maxAge = hour
                req.session.islogged = true;
                req.session.userId = result.id;
                delete result.dataValues.password;
                return Promise.resolve(result);
            } else {
                return Promise.reject("invalid userName or password");
            }
        } catch (error) {
            return Promise.reject("fail to find User");
        }
    },

    getUser: async function (req) {
        try {
            var result = await User.findOne({
                where: { userName: req.query.username }
            });
            if (!result)
                return Promise.reject("fail to find User");
            delete result.dataValues.password;
            console.log(result);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject("fail to find user");
        }
    }
}
