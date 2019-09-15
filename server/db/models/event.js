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
const { titleCase } = require('../../../utils/index');
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
      type: STRING,
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

Event.beforeCreate(instance => {
  instance.name = titleCase(instance.name);
});

Event.beforeUpdate(instance => {
  if (instance.changed('name')) {
    instance.name = titleCase(instance.name);
  }
});

Event.createEvent = function(body) {
  try {
    return Event.create(body);
  } catch (error) {
    const fieldName = error.errors[0].path;
    throw new EventError(fieldName, 'Please fill in this field.');
  }
};

module.exports = Event;
