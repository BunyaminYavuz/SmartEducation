const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
  [
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter your name!')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),

    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email!')
      .custom(async (userMail) => {
        const user = await User.findOne({ email: userMail });
        if (user) {
          throw new Error('This email is already in use!');
        }
      }),

    body('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter your password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  authController.createUser
); // http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser); // http://localhost:3000/users/login
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);

module.exports = router;
