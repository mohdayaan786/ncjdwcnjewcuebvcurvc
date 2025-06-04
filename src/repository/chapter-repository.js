const Chapter = require('../models/chapter');

const findChapters = (filter, page, limit) => {
  return Chapter.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
};

const countChapters = (filter) => {
  return Chapter.countDocuments(filter);
};

const findChapterById = (id) => {
  return Chapter.findById(id);
};

const createChapter = (chapterData) => {
  const chapter = new Chapter(chapterData);
  return chapter.save();
};

module.exports = {
  findChapters,
  countChapters,
  findChapterById,
  createChapter,
};
