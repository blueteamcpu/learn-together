const db = require('../connection');
const sequelize = require('sequelize');

class Course extends sequelize.Model {}
Course.init(
  {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: sequelize.TEXT,
      unique: true,
      allowNull: false,
    },
    link: {
      type: sequelize.TEXT,
      unique: true,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: 'course',
  }
);

module.exports = Course;
