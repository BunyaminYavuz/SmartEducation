const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

CourseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    strict: true,
    lower: true,
  });
  next();
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
