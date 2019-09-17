const event = {
  name: '',
  description: '',
  day: '',
  startTime: '',
  endTime: '',
  location: '',
  zipcode: '',
};

const date = new Date();

module.exports = [
  { name: 'Testing the waters',
    description: 'Trying to figure out how Times are working for this model',
    day: date,
    startTime: '10:00',
    endTime: '12:00',
    location: 'The best place on Earth',
    zipcode: '23498',
  },
  { name: 'Another event!',
    description: 'We have not idea what we are doing, but we are doin it!!!',
    day: date,
    startTime: '07:00',
    endTime: '11:00',
    location: 'Down in the darkest place we know',
    zipcode: '98765',
  }
];
