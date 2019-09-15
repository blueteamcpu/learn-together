const { Model, STRING, INTEGER, UUID, UUIDV4, TEXT } = require('sequelize');
const db = require('../connection');
const { titleCase } = require('../../../utils/index');

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
    zipcode: {
      type: INTEGER,
      allowNull: false,
    },
    description: {
      type: TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'group',
  }
);

Group.beforeCreate(instance => {
  instance.name = titleCase(instance.name.trim());
});

Group.beforeUpdate(instance => {
  if (instance.changed('name')) {
    instance.name = titleCase(instance.name.trim());
  }
});

module.exports = Group;
