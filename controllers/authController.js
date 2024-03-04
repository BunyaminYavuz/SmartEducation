const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  try {
    res.status(201).json({
      status: 'Successful',
      user,
    });
  } catch {
    res.status(400).json({
      status: 'Failed',
      error,
    });
  }
};

exports.logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send('No user');
    }
    const same = await bcrypt.compare(password, user.password);
    if (same) {
      res.status(200).send('Logged in.');
    }
  } catch {
    res.status(400).json({
      status: 'Failed',
      error,
    });
  }
};
