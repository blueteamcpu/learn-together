if (!process.env.IS_PRODUCTION) {
  require('dotenv').config();
}

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('io', io);

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(require('./sessionMiddleware'));

app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./serializeUserMiddleware'));

app.use('/auth', require('../auth/index'));
app.use('/api', require('../apiRoutes/index'));

app.use(require('./errorMiddleware/index'));

module.exports = { server, io };
