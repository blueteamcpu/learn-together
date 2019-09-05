const bcrypt = require('bcryptjs');

const makeHash = str => {
  return bcrypt.hash(str, 12);
};

const compareStrAgainstHash = (str, hash) => {
  return bcrypt.compare(str, hash);
};

const titleCase = str => {
  if (str.length === 1) {
    return str.toUpperCase();
  } else {
    return str[0].toUpperCase() + str.slice(1);
  }
};

module.exports = {
  makeHash,
  titleCase,
  compareStrAgainstHash,
};
