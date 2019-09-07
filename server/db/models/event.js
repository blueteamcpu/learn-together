const {
  Model,
  STRING,
  INTEGER,
  UUID,
  UUIDV4,
  TEXT,
  DATE,
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
      type: DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    time: {
      type: TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    zipcode: {
      type: INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: db,
    modelName: 'event',
  }
);

module.exports = Event;
