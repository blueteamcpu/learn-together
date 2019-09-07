const { Model, UUID, UUIDV4 } = require('sequelize');
const db = require('../connection');

class CourseGroup extends Model {}
CourseGroup.init(
  {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
  },
  {
    sequelize: db,
    modelName: 'course_group',
  }
);

module.exports = CourseGroup;
