const bcrypt = require('bcryptjs');

const makeHash = str => {
  return bcrypt.hash(str, 12);
};

const compareStrAgainstHash = (str, hash) => {
  return bcrypt.compare(str, hash);
};

const titleCase = str => {
  if (str.length === 0) {
    return str;
  } else if (str.length === 1) {
    return str.toUpperCase();
  } else {
    return str
      .split(' ')
      .map(_str => _str[0].toUpperCase() + _str.slice(1))
      .join(' ');
  }
};

module.exports = {
  makeHash,
  titleCase,
  compareStrAgainstHash,
};
