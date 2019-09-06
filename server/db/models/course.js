const db = require('../connection');
const sequelize = require('sequilize');

module.exports = Course;

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
      type: sequelize.STRING(1024),
      unique: true,
      allowNull: false,
    },
    link: {
      type: sequelize.STRING(4096),
      unique: true,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'course',
  }
);
