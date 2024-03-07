const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  const course = await Course.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    user: req.session.userID,
  });
  try {
    res.status(201).redirect('/courses');
  } catch {
    res.status(400).json({
      status: 'Failed',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    const categories = await Category.find();

    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdDate');
    res.status(200).render('courses', {
      categories,
      courses,
      page: 'courses',
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    const user = await User.findById(req.session.userID);
    const categories = await Category.find();
    res.status(200).render('course', {
      categories,
      course,
      page: 'courses',
      user,
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.courses.push({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
