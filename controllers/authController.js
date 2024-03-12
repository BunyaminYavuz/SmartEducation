const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);

    res.status(201).render('login', {
      page: 'login',
    });
  } catch (error) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        req.flash('error', `${error.msg}`);
      });
    }

    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const same = await bcrypt.compare(password, user.password);
      if (same) {
        // User SESSION
        req.session.userID = user._id;
        res.status(200).redirect('/users/dashboard');
      } else {
        req.flash('error', 'Incorrect password. Please try again.');
        res.status(400).redirect('/login');
      }
    }
    if (!user) {
      req.flash(
        'error',
        'No user found with this email. Please check your email or register.'
      );
      res.status(400).redirect('/login');
    }
  } catch (error) {
    req.flash('error', 'Something went wrong!');
    res.status(400).redirect('/login');
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findById(req.session.userID).populate('courses');
  const categories = await Category.find();

  const courses = await Course.find({ user: req.session.userID })
    .populate('user')
    .sort('-createdDate');

  const users = await User.find();

  res.status(200).render('dashboard', {
    page: 'dashboard',
    user,
    categories,
    courses,
    users,
  });
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Course.deleteMany({user: req.params.id})
    req.flash('success', 'User successfully deleted.')
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    req.flash('error', 'Failed to delete the user.');
    res.status(400).redirect('/users/dashboard');
  }
};
