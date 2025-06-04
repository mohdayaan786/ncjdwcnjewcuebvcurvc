// Import the redis client object, not the module itself
const { client: redisClient } = require('../config/redis');

const cacheChapters = async (req, res, next) => {
  try {
    const cacheKey = `chapters:${JSON.stringify(req.query)}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      // Cache hit - send cached response
      return res.status(200).json(JSON.parse(cachedData));
    }

    // Cache miss - override res.json to cache the response
    res.sendResponse = res.json;
    res.json = (body) => {
      // Cache for 3600 seconds = 1 hour
      redisClient.setEx(cacheKey, 3600, JSON.stringify(body))
        .catch(err => console.error('Redis setEx error:', err));
      res.sendResponse(body);
    };

    next();
  } catch (err) {
    console.error('Redis Cache Error:', err);
    next();
  }
};

module.exports = cacheChapters;