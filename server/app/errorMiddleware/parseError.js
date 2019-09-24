/* eslint-disable complexity */
const sentenceCase = str => str.slice(0, 1).toUpperCase() + str.slice(1);

const parseValidate = e => {
  const { validatorKey: key, path } = e;
  let msg = '';
  if (key === 'notEmpty') {
    if (path === 'firstName') {
      msg = 'First name is required.';
    } else if (path === 'lastName') {
      msg = 'Last name is required.';
    } else if (path === 'startTime') {
      msg = 'Start time is required.';
    } else if (path === 'endTime') {
      msg = 'End time is required.';
    } else if (key === 'apikey') {
      msg = 'API key is required.';
    } else {
      msg = sentenceCase(`${path} is required.`);
    }
  } else if (key === 'isEmail') {
    msg = sentenceCase(`${path} must be a valid email address.`);
  } else if (key === 'len') {
    if (path === 'password') {
      msg = 'Password must be at least 8 characters long.';
    } else {
      msg = sentenceCase(`${path} is to short.`);
    }
  } else if (key === 'isUrl') {
    msg = sentenceCase(`${path} must be a valid url.`);
  } else if (key === 'not_unique') {
    msg = sentenceCase(`${path} is already a topic`);
  }

  return msg;
};

const parseNotValidate = e => {
  const { type, path } = e;
  let msg = '';

  if (type.startsWith('notNull')) {
    if (path === 'firstName') {
      msg = 'First name is required.';
    } else if (path === 'lastName') {
      msg = 'Last name is required.';
    } else {
      msg = sentenceCase(`${path} is required.`);
    }
  } else if (type.startsWith('unique')) {
    if (path === 'email') {
      msg = 'An account is already registered to this email address.';
    } else {
      msg = sentenceCase(`${path} must be unique.`);
    }
  }

  return msg;
};

const parseError = e => {
  return e.type === 'Validation error' ? parseValidate(e) : parseNotValidate(e);
};

module.exports = parseError;
