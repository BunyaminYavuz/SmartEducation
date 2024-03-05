const User = require('../models/User');

module.exports = (req, res, next) => {
  User.findById(req.session.userID)
    .then((user) => {
      if (!user) {
        return res.redirect('/login');
      }
      next();
    })
    .catch((err) => {
      console.error('Error finding user:', err);
    });
};
