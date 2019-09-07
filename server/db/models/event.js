const {
  Model,
  STRING,
  INTEGER,
  UUID,
  UUIDV4,
  TEXT,
  DATEONLY,
  TIME,
} = require('sequelize');
const db = require('../connection');

class Event extends Model {}

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
        notEmpty: true,
      },
    },
    description: {
      type: TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    day: {
      type: DATEONL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    startTime: {
      type: TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    endTime: {
      type: TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: STRING,
      allowNull: false,
    },
    zipcode: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'event',
  }
);

module.exports = Event;
