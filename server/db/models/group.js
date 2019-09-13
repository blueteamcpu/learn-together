const {
  Model,
  STRING,
  INTEGER,
  UUID,
  UUIDV4,
  TEXT,
} = require('sequelize');
const db = require('../connection');

class Group extends Model {}

Group.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: TEXT,
      allowNull: true,
    },
    zipcode: {
      type: INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // subject: {
    //   type: STRING,
    //   allowNull: false,
    //   validate: {
    //     notEmpty: true,
    //   },
    // },
    // topic: {
    //   type: STRING,
    //   allowNull: false,
    //   validate: {
    //     notEmpty: true,
    //   },
    // },
  },

  {
    sequelize: db,
    modelName: 'group',
  }
);

module.exports = Group;
