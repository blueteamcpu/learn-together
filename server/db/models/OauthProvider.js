const { Model, UUID, UUIDV4 } = require('sequelize');
const db = require('../connection');

class OauthProvider extends Model {}
OauthProvider.init(
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
    modelName: 'oauthprovider',
  }
);

module.exports = OauthProvider;
