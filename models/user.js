module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userName: {
            type: type.STRING,
            unique: true,
            required: true
          },
          email: {
            type: type.STRING,
            unique: true,
            required: true
          },
          firstName: {
            type: type.STRING
          },
          lastName: {
            type: type.STRING
          },
          password: {
            type: type.STRING,
            required: true
          },
    })
}