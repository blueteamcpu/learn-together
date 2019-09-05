const { Model, STRING, INTEGER, UUID, UUIDV4 } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../connection');
const { hash, titleCase } = require('../../../utils/index');
const { AuthenticationError } = require('../../../utils/backend');

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
    zipcode: {
      type: INTEGER,
      // leave true b/c Oauth will not have zipcode
      allowNull: true,
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

User.beforeCreate(async instance => {
  try {
    if (
      instance.hasOwnProperty('password') &&
      typeof instance.password === 'string'
    ) {
      instance.password = await hash(instance.password);
    }
    instance.firstName = titleCase(instance.firstName);
    instance.lastName = titleCase(instance.lastName);
  } catch (error) {
    throw error;
  }
});

User.beforeUpdate(async instance => {
  try {
    if (instance.changed('password')) {
      instance.password = await hash(instance.password);
    }
    if (instance.changed('firstName')) {
      instance.firstName = titleCase(instance.firstName);
    }
    if (instance.changed('lastName')) {
      instance.lastName = titleCase(instance.lastName);
    }
  } catch (error) {
    throw error;
  }
});

User.prototype.toJSON = function() {
  const values = this.get();
  delete values.password;
  return values;
};

User.signup = async function({
  firstName,
  lastName,
  username,
  email,
  zipcode,
  password,
}) {
  try {
    if (!password) {
      throw new AuthenticationError('password', 'Password is required');
    }

    const [user, created] = await this.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        username,
        zipcode,
      },
    });

    if (created) {
      return user;
    }

    throw new AuthenticationError(
      'email',
      'An account is already registered to this email address.'
    );
  } catch (error) {
    throw error;
  }
};
