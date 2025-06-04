const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const chapterController = require('../../controllers/chapter-controller');
const authController = require('../../controllers/authController');
const adminOnly = require('../../middlewares/admin');
const cacheChapters = require('../../middlewares/cache');

// Chapter Routes
router.get('/chapters', cacheChapters, chapterController.getChapters);
router.get('/chapters/:id', chapterController.getChapterById);
router.post('/chapters', adminOnly, upload.single('file'), chapterController.uploadChapters);

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
