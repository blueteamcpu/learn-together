const { server, io } = require('./app/index');
const { db } = require('./db/index');

io.on('connection', socket => {
  // any time a user is logged in on the front end
  socket.on('login', userId => {
    socket.userId = userId;
  });

  // type: event / post
  socket.on('join-room', (type, id) => {
    if (socket.userId) {
      socket.join(`${type}-${id}`);
    } else {
      socket.emit('Auth', 'You must be signed in to chat.');
    }
  });

  // type: event / post
  socket.on('leave-room', (type, id) => {
    socket.leave(`${type}-${id}`);
  });
});

const PORT = process.env.PORT || 3000;

db.sync({ force: false })
  .then(() => {
    server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  })
  .catch(console.error);
