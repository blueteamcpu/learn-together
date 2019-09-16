const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);
const cacheDuration = 1000 * 60 * 2;

module.exports = { client, cacheDuration };
