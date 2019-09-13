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
const { EventError } = require('../../../utils/backend');

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

Event.createEvent = async function(body) {
  try {
    const newEvent = await Event.create(body);
    return newEvent;
  } catch (error) {
    const fieldName = error.errors[0].path;
    throw new EventError(fieldName, 'Please fill in this field.');
  }
};

module.exports = Event;
