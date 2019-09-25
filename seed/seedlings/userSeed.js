// All info for users defined here

const user = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  zipcode: '',
  imageURL: '',
  password: '',
  isSiteAdmin: '',
};

// Template for userList
// add as you wish
// {
//   firstName: '',
//   lastName: '',
//   username: '',
//   email: '',
//   zipcode: '',
//   imageURL: '',
//   password: '',
//   isSiteAdmin: '',
// };
// The first user defined is a default site admin, so that we have someone to rely on

module.exports = [
  {
    firstName: 'Mr',
    lastName: 'Immutable',
    username: 'mrimmutable',
    email: 'test@test.test',
    zipcode: 0,
    password: 'testingAdmin',
    isSiteAdmin: false,
  },
  {
    firstName: 'Karen',
    lastName: 'Mc Jerkbutt',
    username: 'kares',
    email: 'kares12@blah.blah',
    zipcode: 0,
    password: '1324kares',
    isSiteAdmin: false,
  },
  {
    firstName: 'Bill',
    lastName: 'Breaker',
    username: 'billyBreaks',
    email: 'breaksit@blah.blah',
    zipcode: 0,
    password: 'billbreaksbad',
    isSiteAdmin: false,
  },
];
