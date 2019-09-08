const db = require('./connection');
const User = require('./models/user');
const Provider = require('./models/provider');
const UserProvider = require('./models/userProvider');
const Session = require('./models/session');
const Comment = require('./models/comment');
const Post = require('./models/post');
const Course = require('./models/course');
const Event = require('./models/event');
const Group = require('./models/group');
const GroupMember = require('./models/groupMember');
const EventAttendee = require('./models/eventAttendee');
const CourseGroup = require('./models/courseGroup');
const Topic = require('./models/topic');

Group.belongsToMany(User, { through: 'group_member' });
Group.belongsTo(User, { as: 'Owner', foreignKey: 'ownerId' });
User.belongsToMany(Group, { through: 'group_member' });

Group.belongsToMany(Course, { through: 'course_group' });
Course.belongsToMany(Group, { through: 'course_group' });

Event.belongsToMany(User, { through: 'event_attendee' });
Event.belongsTo(User, { as: 'Host', foreignKey: 'hostId' });
User.belongsToMany(Event, { through: 'event_attendee' });

User.belongsToMany(Provider, { through: 'user_provider' });
Provider.belongsToMany(User, { through: 'user_provider' });

Event.hasMany(Comment);
Post.hasMany(Comment);
// Tenative, may not work
Comment.hasMany(Comment, { foreignKey: 'threadId' });

Group.hasMany(Event);
Event.belongsTo(Group);

Group.hasMany(Post);
Post.belongsTo(Group);

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Provider.hasMany(Course);
Course.belongsTo(Provider);

Course.belongsTo(Topic);
Group.belongsTo(Topic);
Event.belongsTo(Topic);

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
  Group,
  GroupMember,
  EventAttendee,
  CourseGroup,
  Topic,
};
