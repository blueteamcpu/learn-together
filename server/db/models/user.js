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
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: STRING,
      allowNull: true,
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
    if (instance.firstName) {
      instance.firstName = titleCase(instance.firstName.trim());
    }
    if (instance.lastName) {
      instance.lastName = titleCase(instance.lastName.trim());
    }
    instance.username = instance.username.trim();
    instance.email = instance.email.trim();
    if (instance.password) {
      instance.password = await makeHash(instance.password.trim());
    }
  } catch (error) {
    throw error;
  }
});

User.beforeUpdate(async instance => {
  try {
    if (instance.changed('password')) {
      instance.password = await makeHash(instance.password.trim());
    }
    if (instance.changed('firstName')) {
      instance.firstName = titleCase(instance.firstName.trim());
    }
    if (instance.changed('lastName')) {
      instance.lastName = titleCase(instance.lastName.trim());
    }
    if (instance.changed('username')) {
      instance.username = instance.username.trim();
    }
    if (instance.changed('email')) {
      instance.email = instance.email.trim();
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

    const defaults = { username, zipcode, password };

    if (firstName) {
      defaults.firstName = firstName;
    }
    if (lastName) {
      defaults.lastName = lastName;
    }
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
