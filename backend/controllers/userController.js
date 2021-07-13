const User = require('../models/User');

module.exports.signup_get = (req, res) => {
  res.send('Signup get');
};
module.exports.signup_post = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    console.log(user);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
module.exports.login_get = (req, res) => {
  res.send('Login get');
};
module.exports.login_post = (req, res, next) => {
  res.send('Login post');
};
module.exports.forgotpassword = (req, res, next) => {
  res.send('forgetpassword');
};
module.exports.resetpassword = (req, res, next) => {
  res.send('resetpassword');
};
