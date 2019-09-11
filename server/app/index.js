const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(require('./sessionMiddleware'));

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./serializeUserMiddleware'));

app.use('/auth', require('../auth/index'));
app.use('/event', require('../apiRoutes/event'));
app.use('/group', require('../apiRoutes/group/group'));

app.get('/hello', (req, res) => {
  res.send('Hello there!');
});

module.exports = app;
