const jwt = require('jsonwebtoken');
const userRepo = require('../repository/userRepository');

const registerUser = async ({ username, password, role }) => {
  return await userRepo.createUser({ username, password, role });
};

const loginUser = async ({ username, password }) => {
  const user = await userRepo.findUserByUsername(username);
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid username or password');
  }
  const token = jwt.sign({ id: user._id }, 'mathan_for_you');
  return { token };
};

module.exports = {
  registerUser,
  loginUser
};