const redisClient = require('../config/redis');

const cacheChapters = async (req, res, next) => {
  try {
    const cacheKey = `chapters:${JSON.stringify(req.query)}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If not cached, proceed and cache in controller
    res.sendResponse = res.json;
    res.json = (body) => {
      redisClient.setEx(cacheKey, 3600, JSON.stringify(body)); // Cache for 1 hour
      res.sendResponse(body);
    };

    next();
  } catch (err) {
    console.error('Redis Cache Error:', err);
    next();
  }
};

module.exports = cacheChapters;