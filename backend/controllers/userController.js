module.exports.signup_get = (req, res) => {
  res.send('Signup get');
};
module.exports.signup_post = (req, res, next) => {
  res.send('Signup post');
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
