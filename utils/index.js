const bcrypt = require('bcryptjs');

const hash = str => {
  return bcrypt.hash(str, 12);
};

const titleCase = str => {
  if (str.length === 1) {
    return str.toUpperCase();
  } else {
    return str[0].toUpperCase() + str.slice(1);
  }
};

module.exports = {
  hash,
  titleCase,
};
