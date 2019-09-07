const { Model, UUID, UUIDV4 } = require('sequelize');
const db = require('../connection');

class EventAttendee extends Model {}

EventAttendee.init(
  {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
  },
  {
    sequelize: db,
    modelName: 'event_attendee',
  }
);

module.exports = EventAttendee;
