const { Model, STRING, INTEGER, UUID, UUIDV4, BOOLEAN, TEXT, DATE, TIME } = require('sequelize');
const db = require('../connection');

class GroupMember extends Model{}

GroupMember.init({
        id: {
            type: UUID,
            defaultValue: UUIDV4
        },
        isAdmin: {
            type: BOOLEAN,
        }
    },
    {
        sequelize: db,
        modelName: 'group-member',
    });

    module.exports = GroupMember;
