const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('❌ Redis error:', err));
redisClient.on('connect', () => console.log('✅ Redis connected'));

redisClient.connect(); // Don't forget to call connect()

module.exports = redisClient;