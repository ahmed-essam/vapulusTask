const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const PostModel = require('./models/post');
const TagModel = require('./models/tag');

const sequelize = new Sequelize('GOTBlog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const PostTag = sequelize.define('post_tag', {})
const PostMention = sequelize.define('post_mention', {})

const Tag = TagModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Post.belongsToMany(Tag, { through: PostTag, unique: false })
Tag.belongsToMany(Post, { through: PostTag, unique: false })
Post.belongsToMany(User, { through: PostMention, unique: false})
User.belongsToMany(Post, { through: PostMention, unique: false})
Post.belongsTo(User);
sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = {
    User,
    Post,
    Tag
}