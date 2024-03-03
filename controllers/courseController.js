const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  try {
    res.status(201).json({
      status: 'Successful',
      course,
    });
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

    const courses = await Course.find(filter);
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
    const course = await Course.findOne({ slug: req.params.slug });
    const categories = await Category.find();
    res.status(200).render('course', {
      categories,
      course,
      page: 'courses',
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
