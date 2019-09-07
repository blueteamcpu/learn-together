const { Model, UUID, UUIDV4, BOOLEAN } = require('sequelize');
const db = require('../connection');

class GroupMember extends Model {}

GroupMember.init(
  {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4,
    },
    isAdmin: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: 'group_member',
  }
);

module.exports = GroupMember;
