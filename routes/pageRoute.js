const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddlewares = require('../middlewares/redirectMiddlewares');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router
  .route('/register')
  .get(redirectMiddlewares, pageController.getRegisterPage);
router.route('/login').get(redirectMiddlewares, pageController.getLoginPage);

module.exports = router;
