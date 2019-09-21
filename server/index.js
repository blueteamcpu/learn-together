const { promisify } = require('util');
const app = require('./app/index');
const { db } = require('./db/index');
const { client } = require('./redis');

const PORT = process.env.PORT || 3000;

const listenAsync = promisify(app.listen).bind(app);

client.on('connect', () => {
  db.sync()
    .then(() => listenAsync(PORT))
    .then(() => console.log(`App listening on port ${PORT}`))
    .catch(console.error);
});

client.on('error', error => {
  throw error;
});
