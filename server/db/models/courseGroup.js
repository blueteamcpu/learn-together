const { Model, STRING, INTEGER, UUID, UUIDV4, BOOLEAN, TEXT, DATE, TIME } = require('sequelize');
const db = require('../connection');

class CourseGroup extends Model{}

CourseGroup.init({
        id: {
            type: UUID,
            defaultValue: UUIDV4
        }
    },
    {
        sequelize: db,
        modelName: 'course-group',
    });

module.exports = CourseGroup;
