const app = require('./app/index');
const { db } = require('./db/index');

const PORT = process.env.PORT || 3000;

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  })
  .catch(console.error);
