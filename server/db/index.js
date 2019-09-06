const db = require('./connection');
const User = require('./models/user');
const Provider = require('./models/Provider');
const UserProvider = require('./models/userProvider');
const Session = require('./models/session');
const Comment = require('./models/comment');
const Post = require('./models/post');
const Course = require('./mosels/course');

module.exports = {
  db,
  User,
  Provider,
  UserProvider,
  Session,
  Comment,
  Post,
  Course,
};
