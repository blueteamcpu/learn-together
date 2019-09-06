const db = require('../connection');
const sequelize = require('sequelize');

class Comment extends sequelize.Model {}
Comment.init(
  {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    content: {
      type: sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: 'comment',
  }
);

module.exports = Comment;
