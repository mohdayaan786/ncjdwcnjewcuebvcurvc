const chapterService = require('../services/chapter-service');
const { client: redisClient } = require('../config/redis');
const fs = require('fs/promises');

const getChapters = async (req, res) => {
  try {
    const { class: classFilter, unit, status, weakChapters, subject, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (classFilter) filters.class = classFilter;
    if (unit) filters.unit = unit;
    if (status) filters.status = status;
    if (weakChapters !== undefined) filters.isWeakChapter = weakChapters === 'true';
    if (subject) filters.subject = subject;

    const data = await chapterService.getChapters(filters, Number(page), Number(limit));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getChapterById = async (req, res) => {
  try {
    const chapter = await chapterService.getChapterById(req.params.id);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.json(chapter);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const uploadChapters = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'JSON file required' });
  }

  try {
    const data = await fs.readFile(req.file.path, 'utf-8');
    const chaptersArray = JSON.parse(data);

    if (!Array.isArray(chaptersArray)) {
      return res.status(400).json({ message: 'JSON must be an array of chapters' });
    }

    const { successUploads, failedUploads } = await chapterService.uploadChapters(chaptersArray);

    // Remove uploaded temp file
    await fs.unlink(req.file.path);

    // Invalidate all Redis chapter-related cache
    try {
      const keys = await redisClient.keys('chapters*');
      if (keys.length) {
        await redisClient.del(keys);
      }
    } catch (redisErr) {
      console.error('❌ Redis cache invalidation error:', redisErr.message);
    }

    return res.status(201).json({
      message: 'Upload completed',
      successCount: successUploads.length,
      failedUploads
    });

  } catch (error) {
    console.error('❌ Upload Error:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
  getChapters,
  getChapterById,
  uploadChapters,
};