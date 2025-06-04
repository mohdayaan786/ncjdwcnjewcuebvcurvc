const chapterRepository = require('../repository/chapter-repository');

const getChapters = async (filters, page, limit) => {
  const totalChapters = await chapterRepository.countChapters(filters);
  const chapters = await chapterRepository.findChapters(filters, page, limit);
  return { totalChapters, chapters };
};

const getChapterById = async (id) => {
  return chapterRepository.findChapterById(id);
};

const uploadChapters = async (chaptersArray) => {
  const failedUploads = [];
  const successUploads = [];

  for (const chapterData of chaptersArray) {
    try {
      const chapter = await chapterRepository.createChapter(chapterData);
      successUploads.push(chapter);
    } catch (error) {
      failedUploads.push({ chapter: chapterData, error: error.message });
    }
  }

  return { successUploads, failedUploads };
};

module.exports = {
  getChapters,
  getChapterById,
  uploadChapters,
};
