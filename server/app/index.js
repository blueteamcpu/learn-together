const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compressoin = require('compression');
const helmet = require('helmet');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compressoin());

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.get('/hello', (req, res) => {
  res.send('Hello there!');
});

module.exports = app;
