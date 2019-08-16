
var allCharsWithRange = function (min, max) {
    return new RegExp('^[\\s\\S]{' + min + ',' + max + '}$')
};

var tagEXP = /(^\S)[\_\.\-a-zA-Z0-9@]{2,128}$/,
tagsArray = function (ids) {

    try {
        ids = ids.replace(/'/g, '"');
        ids = JSON.parse(ids);
    } catch (err) {
        ids = ids;
    }
    if (Array.isArray(ids) && ids.length > 0) {
        for (var i in ids) {
            if (!tagEXP.test(ids[i]))
                return false;
        }
        return ids;
    } else {
        return false;
    }
};

module.exports = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z]{2,128}$/,
    userName: /(^\S)[\_\.\-a-zA-Z0-9@]{2,128}$/,
    firstName: allCharsWithRange(1, 128),
    lastName: allCharsWithRange(1, 128),
    password: /^.{6,512}$/,
    body: allCharsWithRange(1, 140),
    tags: tagsArray,
    mentions: tagsArray,    
}