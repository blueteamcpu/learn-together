const { server, io } = require('./app/index');
const { promisify } = require('util');
const { db } = require('./db/index');
const { client } = require('./redis');

io.on('connection', socket => {
  console.log('connected');

  // any time a user is logged in on the front end
  socket.on('login', userId => {
    console.log('logging in baby');

    socket.userId = userId;

    socket.emit('authenticated');
  });

  // type: event / post
  socket.on('join-room', ({ type, id }) => {
    console.log('in join room');
    if (socket.userId) {
      console.log('joining');
      socket.join(`${type}-${id}`);
    } else {
      socket.emit('Auth', 'You must be signed in to chat.');
    }
  });

  // type: event / post
  socket.on('leave-room', ({ type, id }) => {
    console.log('leaving room', type, id);
    socket.leave(`${type}-${id}`);
  });
});

const PORT = process.env.PORT || 3000;

const listenAsync = promisify(server.listen).bind(server);

client.on('connect', () => {
  db.sync()
    .then(() => listenAsync(PORT))
    .then(() => console.log(`App listening on port ${PORT}`))
    .catch(console.error);
});

client.on('error', error => {
  throw error;
});
