const { Model, STRING, INTEGER, UUID, UUIDV4, BOOLEAN } = require('sequelize');
const db = require('../connection');
const {
  makeHash,
  titleCase,
  compareStrAgainstHash,
} = require('../../../utils/index');
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
    imageURL: {
      type: STRING,
      defaultValue:
        'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png',
      validate: {
        isUrl: true,
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
    isSiteAdmin: {
      type: BOOLEAN,
      defaultValue: false,
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
      instance.password = await makeHash(instance.password);
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
      instance.password = await makeHash(instance.password);
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
  imageURL,
  zipcode,
  password,
}) {
  try {
    if (!password) {
      throw new AuthenticationError('password', 'Password is required');
    }

    const defaults = { firstName, lastName, username, zipcode };

    if (imageURL) {
      defaults.imageURL = imageURL;
    }

    const [user, created] = await this.findOrCreate({
      where: { email },
      defaults,
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

User.login = async function(email, password) {
  try {
    const user = await this.findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationError(
        'email',
        'There is no user registered to that email address.'
      );
    }

    const isPassword = await compareStrAgainstHash(password, user.password);

    if (isPassword) {
      return user;
    } else {
      throw new AuthenticationError('password', 'Invalid password.');
    }
  } catch (error) {
    throw error;
  }
};

module.exports = User;
