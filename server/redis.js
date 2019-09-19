const { promisify } = require('util');
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);
const cacheDuration = 1000 * 60 * 2;

const getAsync = promisify(client.get).bind(client);
const setExAsync = promisify(client.setex).bind(client);

module.exports = { getAsync, setExAsync, cacheDuration };
