const validation = require('./../config/validation');
const params = require('./../config/params')

module.exports = function (req, res, next) {
    var _params = params[req.originalUrl];
    var newBody = {};
    for (var param in _params) {
        if (req.body[param]) {
            if (_params[param] === true) {
                console.log(req.body[param]);
                if (req.body[param] && validation[param] && validation[param].test(req.body[param])) {
                    newBody[param] = req.body[param];
                    continue
                }
                else {
                    res.status(401);
                    res.json({
                        statusCade: 401,
                        message: "please inter valid " + param
                    });
                }
            }
            newBody[param] = req.body[param];
        }else{
            res.status(401);
            res.json({
                statusCade: 401,
                message: "please inter valid " + param
            });
        }
    }
    req.body = newBody;
    console.log("finish")
    next();
}