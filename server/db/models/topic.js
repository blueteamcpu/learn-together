const db = require('../connection');
const sequelize = require('sequelize');

class Topic extends sequelize.Model {}
Topic.init(
  {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },      

  },
  {
    sequelize: db,
    modelName: 'topic',
  }
);

module.exports = Topic;
