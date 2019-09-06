const { Model, STRING, INTEGER, UUID, UUIDV4, BOOLEAN } = require('sequelize');
const db = require('../connection');

class UserProvider extends Model {}
Provider.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      unique: true,
      primaryKey: true,
    },
  },
  {
    sequelize: db,
    modelName: 'userprovider',
  }
);

module.exports = UserProvider;
