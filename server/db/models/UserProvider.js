const { Model, STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../connection');

class UserProvider extends Model {}
UserProvider.init(
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
      },
    },
  },
  {
    sequelize: db,
    modelName: 'user_provider',
  }
);

module.exports = UserProvider;
