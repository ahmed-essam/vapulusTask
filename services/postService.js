const { User, Post, Tag } = require('./../DB');
const validation = require('./../config/validation');
const sendemail = require('./emailservice');

// function validateQuiz(req.body) {
//     var regularExpretion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return regularExpretion.test(String(email).toLowerCase());
// }

module.exports = {
    create: async function (req) {

        //validate tags
        var validTags = validation.tags(req.body.tags);
        var validMention = validation.mentions(req.body.mentions);

        if (!validTags && req.body.tags)
            return Promise.reject("please enter valid tags");

        if (!validMention && req.body.mentions)
            return Promise.reject("please enter valid mentions");

        try {
            console.log(validTags);
            //create or find tags
            var tags = validTags.map(_tag => Tag.findOrCreate({ where: { name: _tag }, defaults: { name: _tag } })
                .spread((_tag) => _tag));

            //find user
            var _user = await User.findByPk(req.session.userId);
            if (!_user)
                return Promise.reject("fail to fin user");

            var mentions = validMention.map(mention => User.findOne({ where: { userName: mention }, defaults: { userName: mention } })
                .then((mention) => {
                    sendemail({ to: mention.email, body: "" + _user.userName + "mentioned you in apost" });
                    return mention
                }));
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", tags);

            //create post
            var _post = await Post.create(Object.assign({ userId: req.session.userId }, req.body));
            // add relations 
            Promise.all(mentions).then(storedMention => _post.addUsers(storedMention)).then(() => _post).then(() =>
                Promise.all(tags)).then(storedTags => _post.addTags(storedTags)).then(() => _post)
                .then(_post => Post.findOne({ where: { id: _post.id }, include: [User, Tag] }))
                .then(postWithAssociations => Promise.resolve(postWithAssociations))
                .catch(err => Promise.reject("fail to add post"));

        } catch (error) {
            console.log(error);
            return Promise.reject("fail to create post");
        }
    },

    getMyPosts: async function (req) {
        try {
            var result = await Post.findOne({
                where: { id: req.query.id },
                include: [
                    { model: User, where: { id: req.session.userId } },
                    { model: Tag }
                ]
            });
            if (!result)
                return Promise.reject("fail to find User");
            return Promise.resolve(result);
        } catch (error) {
            console.log(error);
            return Promise.reject("fail to get posts");
        }
    },

    getPost: async function (req) {
        try {
            var result = await Post.findOne({
                where: { id: req.query.id },
                include: [
                    { model: User },
                    { model: Tag }
                ]
            });
            if (!result)
                return Promise.reject("fail to find User");
            return Promise.resolve(result);
        } catch (error) {
            console.log(error);
            return Promise.reject("fail to get post");
        }
    },

    list: async function (req) {
        try {
            console.log(req.query);
            var result = {};
            if (req.query.tag) {
                result = await Post.findAll({
                    include: [
                        { model: User },
                        { model: Tag, where: { name: req.query.tag } }
                    ]
                });
            } else {
                result = await Post.findAll({
                    order: [["createdAt", "DESC"]],
                    include: [User, Tag]
                });
            }
            if (!result)
                return Promise.reject("fail to find User");
            return Promise.resolve(result);
        } catch (error) {
            console.log(error);
            return Promise.reject("fail to get posts");
        }
    }
}
