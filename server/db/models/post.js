const db = require('../connection');
const sequelize = require('sequelize');

class Post extends sequelize.Model {}
Post.init(
  {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: 'post',
  }
);

module.exports = Post;
