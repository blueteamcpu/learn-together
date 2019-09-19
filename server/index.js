const app = require('./app/index');
const { db } = require('./db/index');
const { syncRedisClient } = require('./redis');

const PORT = process.env.PORT || 3000;

db.sync()
  .then(() => syncRedisClient())
  .then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  })
  .catch(console.error);
