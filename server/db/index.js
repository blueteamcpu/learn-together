const db = require('./connection');
const User = require('./models/user');
const Comment = require('./models/comment');
const Post = require('./models/post');
const Course = require('./mosels/course');

module.exports = {
  db,
  User,
};
