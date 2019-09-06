const { Model, STRING, UUID, UUIDV4} = require('sequelize');
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
    apikey: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  },
  {
    sequelize: db,
    modelName: 'userprovider',
  }
);

module.exports = UserProvider;
