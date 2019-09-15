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
    day: date.getDay(),
    startTime: '10:00',
    endTime: '12:00',
    location: 'The best place on Earth',
    zipcode: '23498',
  },
];
