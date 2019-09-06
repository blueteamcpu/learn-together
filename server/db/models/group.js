const { Model, STRING, INTEGER, UUID, UUIDV4, BOOLEAN, TEXT } = require('sequelize');
const db = require('../connection');

class Group extends Model{}

module.exports = Group;

Group.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        subject: {
            type: STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        topic: {
            type: STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        zipcode: {
            type: INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: TEXT,
            allowNull: true
        },
        sequelize: db,
        modelName: 'user',
}
);
