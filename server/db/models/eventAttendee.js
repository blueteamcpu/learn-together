const { Model, STRING, INTEGER, UUID, UUIDV4, BOOLEAN, TEXT, DATE, TIME } = require('sequelize');
const db = require('../connection');

class EventAttendee extends Model{}

EventAttendee.init({
        id: {
            type: UUID,
            defaultValue: UUIDV4,
        }
    },
    {
        sequelize: db,
        modelName: 'event-attendee',
    }
);

module.exports = EventAttendee;
