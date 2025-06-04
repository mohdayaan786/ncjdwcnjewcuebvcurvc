const passport = require('passport');

const adminOnly = [
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admins only!' });
    }
    next();
  }
];

module.exports = adminOnly;