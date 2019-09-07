const { Model, STRING, UUID, UUIDV4 } = require('sequelize');
const db = require('../connection');

class Provider extends Model {}
Provider.init(
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
    modelName: 'provider',
  }
);

module.exports = Provider;
