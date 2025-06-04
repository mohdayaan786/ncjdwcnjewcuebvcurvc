const User = require('../models/user');

const createUser = async (data) => {
  const user = new User(data);
  return await user.save();
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById
};