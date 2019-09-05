import { Model, STRING, UUID, UUIDV4 } from 'sequelize';
import db from '../connection';

class User extends Model {}
User.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      unique: true,
      primaryKey: true,
    },
    firstName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: STRING,
      // leave true b/c Oauth will not have password
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [8],
        // passwords must be at least 8 characters with one letter and one number
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      },
    },
  },
  {
    sequelize: db,
    modelName: 'user',
  }
);
