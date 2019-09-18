const db = require('../connection');
const sequelize = require('sequelize');

class Comment extends sequelize.Model {
  static async commentOnAComment(id, content, userId) {
    try {
      const parent = await this.findOne({ where: { id } });

      if (parent.threadId) {
        return false;
      } else {
        return this.create({ content, threadId: id, userId });
      }
    } catch (error) {
      throw error;
    }
  }
}

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
