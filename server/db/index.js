const db = require('./connection');
const User = require('./models/user');
const Provider = require('./models/provider')
const UserProvider = require('./models/userProvider')
const Session = require('./models/session');
const Comment = require('./models/comment');
const Post = require('./models/post');
const Course = require('./models/course');
const Event = require('./models/event');
const Group = require('./models/group');


module.exports = {
  db,
  User,
  Provider,
  UserProvider,
  Session,
  Comment,
  Post,
  Course,
  Event,
  Group
};
