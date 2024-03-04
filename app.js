const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const authController = require('./routes/authRoute');

const app = express();

// Db Connection
mongoose
  .connect('mongodb://localhost/smart-education-db')
  .then(() => {
    console.log('Db connected :)');
  })
  .catch((err) => {
    console.log(err);
  });

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', authController);

const port = 3000;
app.listen(port, () => {
  console.log(`The server has been started on port ${port}`);
});
