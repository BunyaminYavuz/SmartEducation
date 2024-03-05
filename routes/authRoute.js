const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

router.route('/signup').post(authController.createUser); // http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser); // http://localhost:3000/users/login
router.route('/logout').get(authController.logoutUser);
router
  .route('/dashboard')
  .get(authMiddleware, authController.getDashboardPage);

module.exports = router;
