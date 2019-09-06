const { Model, STRING, INTEGER, UUID, UUIDV4, BOOLEAN, TEXT, DATE, TIME } = require('sequelize');
const db = require('../connection');

class Event extends Model{}

Event.init(
    {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
            validate: {
            notEmpty: true
            }
        },
        description: {
            type: TEXT,
            allowNull: true
        },
        day: {
            type: DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        time: {
            type: TIME,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        location: {
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
    }
);

module.exports = Event;
