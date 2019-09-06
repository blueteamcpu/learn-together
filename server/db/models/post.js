const db = require('../connection');
const sequelize = require('sequilize');

module.exports = Post;

class Post extends sequelize.Model {}
Post.init(
  {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    topic: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: sequelize.TEXT,
      allowNull: true,
    }
  }
);
