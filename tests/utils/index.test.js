const {
  makeHash,
  compareStrAgainstHash,
  titleCase,
} = require('../../utils/index');

let toHash = 'password';
let hashed = null;

describe('titleCase', () => {
  test('it capitalizes the first letter of a string', () => {
    expect(titleCase('hello')).toBe('Hello');
    expect(titleCase('h')).toBe('H');
    expect(titleCase('')).toBe('');
  });
});

describe('makeHash', () => {
  test('it returns a promise', () => {
    expect(makeHash('hi')).toBeInstanceOf(Promise);
  });

  test('it returns a hashed string', async () => {
    hashed = await makeHash(toHash);
    expect(hashed).not.toBe(toHash);
  });
});

describe('compareStrAgainstHash', () => {
  test('it returns a promise', () => {
    expect(compareStrAgainstHash(toHash, hashed)).toBeInstanceOf(Promise);
  });

  test('it returns true if a str is equal to a hash', async () => {
    expect(await compareStrAgainstHash(toHash, hashed)).toBe(true);
  });

  test('it returns false if a str is not equal to a hash', async () => {
    expect(await compareStrAgainstHash('hi', hashed)).toBe(false);
  });
});
