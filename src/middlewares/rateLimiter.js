const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis').default; // ✅ FIXED
const redisClient = require('../config/redis');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per windowMs
  message: {
    message: 'Too many requests. Please try again after a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  store: new  RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
});

module.exports = limiter;
