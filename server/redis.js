const { promisify } = require('util');
const redis = require('redis');

const cacheDuration = 1000 * 60 * 2;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const onAsync = promisify(client.on).bind(client);
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const setExAsync = promisify(client.setex).bind(client);
const existsAsync = promisify(client.exists).bind(client);

const syncRedisClient = async () => {
  try {
    await onAsync('connection');
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  syncRedisClient,
  existsAsync,
  getAsync,
  setAsync,
  setExAsync,
  cacheDuration,
};
