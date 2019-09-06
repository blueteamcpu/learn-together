const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { db } = require('../db/index');

function extendDefaultFields(defaults, _session) {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: _session.userId,
  };
}

const store = new SequelizeStore({
  db,
  table: 'session',
  extendDefaultFields,
});

const middleware = session({
  secret: process.env.SECRET || 'bad secret',
  store,
  resave: false,
  saveUninitialized: true,
});

module.exports = middleware;
