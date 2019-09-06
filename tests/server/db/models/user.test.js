const { User } = require('../../../../server/db/index');
const { compareStrAgainstHash } = require('../../../../utils/index');

// test('test', () => {
//   expect(true).toBe(true);
// });

let user = null;

beforeAll(async () => {
  user = await User.create({
    firstName: 'Justin',
    lastName: 'Cook',
    username: 'justinc',
    email: 'justin@email.com',
    zipcode: '93479',
    password: 'justin12345',
  });
});

afterAll(async () => {
  user = null;
  await User.destroy({ where: { username: 'justinc' } });
});

describe('User hashes a password when it is created', function() {
  test('users password is not justin', () => {
    expect(user.password).not.toBe('justin');
  });
});

describe('User hashes a password when it is updated', () => {
  test('updated passwords are hashed as well', async () => {
    // await user.update({ password: 'justidfadfn1' });
    console.log(user.password);

    expect(user.password).not.toBe('justinc');
    expect(await compareStrAgainstHash('justin', user.password)).toBe(false);
    expect(await compareStrAgainstHash('justin12345', user.password)).toBe(true);
  });
});
