const { User } = require('../../../../server/db/index');
const { compareStrAgainstHash } = require('../../../../utils/index');
const { AuthenticationError } = require('../../../../utils/backend');

let user = null;

beforeAll(async () => {
  user = await User.create({
    firstName: 'Jman',
    lastName: 'Cook',
    username: 'justinc',
    email: 'justin@email.com',
    zipcode: '93479',
    password: 'justin12345',
  });
});

afterAll(async () => {
  user = null;
  await User.destroy({ where: { firstName: 'Jman' } });
});

describe('User hashes a password when it is created', function() {
  test('users password is not justin', () => {
    expect(user.password).not.toBe('justin');
  });
});

describe('User hashes a password when it is updated', () => {
  test('updated passwords are hashed as well', async () => {
    await user.update({ password: 'justinc12345' });
    expect(user.password).not.toBe('justinc12345');
    expect(await compareStrAgainstHash('justin12345', user.password)).toBe(
      false
    );
    expect(await compareStrAgainstHash('justinc12345', user.password)).toBe(
      true
    );
  });
});

describe('toJSON', () => {
  test('it never exposes a password', () => {
    const json = user.toJSON();
    expect(json.hasOwnProperty('password')).toBe(false);
  });
});

describe('signup', () => {
  test('throws an error if password is not included in the argument object', async () => {
    try {
      await User.signup({});
    } catch (error) {
      expect(error.field).toBe('password');
      expect(error).toBeInstanceOf(AuthenticationError);
    }
  });

  test('throws an error if email is already registered to an account', async () => {
    try {
      await User.signup({
        firstName: 'Jman',
        lastName: 'Cook',
        username: 'jman',
        email: 'justin@email.com',
        zipcode: '93479',
        password: 'justin12345',
      });
    } catch (error) {
      expect(error.field).toBe('email');
      expect(error).toBeInstanceOf(AuthenticationError);
    }
  });

  test('returns a new user', async () => {
    const user2 = await User.signup({
      firstName: 'Jman',
      lastName: 'Cook',
      username: 'jman',
      email: 'jman@email.com',
      zipcode: '93479',
      password: 'jman12345',
    });

    expect(typeof user2).toBe('object');
    expect(user2.firstName).toBe('Jman');
  });
});

describe('login', () => {
  test('it throws an error for an email that has no user', async () => {
    try {
      await User.login('testerYOO@email.com', 'test');
    } catch (error) {
      expect(error.field).toBe('email');
      expect(error).toBeInstanceOf(AuthenticationError);
    }
  });

  test('it throws an error for an incorrect password', async () => {
    try {
      await User.login('justin@email.com', 'dasff');
    } catch (error) {
      expect(error.field).toBe('password');
      expect(error).toBeInstanceOf(AuthenticationError);
    }
  });

  test('it returns a user for correct login information', async () => {
    const _user = await User.login('justin@email.com', 'justinc12345');
    expect(typeof _user).toBe('object');
    expect(_user.firstName).toBe('Jman');
  });
});
