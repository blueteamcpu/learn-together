const { promisify } = require('util');
const redis = require('redis');

const cacheDurationInSeconds = 60 * 60;
const REDIS_URL = process.env.REDIS_URL || 6379;

const client = redis.createClient(REDIS_URL);

const getAsync = promisify(client.get).bind(client);
const setExAsync = promisify(client.setex).bind(client);
const existsAsync = promisify(client.exists).bind(client);

module.exports = {
  client,
  existsAsync,
  getAsync,
  setExAsync,
  cacheDurationInSeconds,
};
