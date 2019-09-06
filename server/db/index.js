const db = require('./connection');
const User = require('./models/user');
const Provider = require('./models/Provider')
const UserProvider = require('./models/UserProvider')
const OauthProvider = require('./models/OauthProvider')

module.exports = {
  db,
  User,
  Provider,
  UserProvider,
  OauthProvider,
};
