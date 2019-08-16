const validation = require('./../config/validation');
const params = require('./../config/params')

module.exports = function (req, res, next) {

    if (!req.session || !req.session.userId) {
        res.status(403);
        res.json({
            statusCade: 403,
            message: "not Uthorized user"
        });
    }
    next();
}