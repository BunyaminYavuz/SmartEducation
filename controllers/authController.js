const User = require('../models/User');
const Category = require('../models/Category');
const bcrypt = require('bcrypt');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  await User.create(req.body);
  try {
    res.status(201).render('login', {
      page: 'login',
    });
  } catch {
    res.status(400).json({
      status: 'Failed',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send('No user');
    }
    const same = await bcrypt.compare(password, user.password);
    if (same) {
      // User SESSION
      req.session.userID = user._id;
      res.status(200).redirect('/users/dashboard');
    }
  } catch {
    res.status(400).json({
      status: 'Failed',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findById(req.session.userID);
  const categories = await Category.find();

  const courses = await Course.find({ user: req.session.userID }).populate('user' );
  
  res.status(200).render('dashboard', {
    page: 'dashboard',
    user,
    categories,
    courses,
  });
};
