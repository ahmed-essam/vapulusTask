module.exports = (sequelize, type) => {
    return sequelize.define('post', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        body: {
            type: type.STRING,
            required: true
          },
      
    })
}