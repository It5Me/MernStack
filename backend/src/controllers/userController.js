const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
module.exports = {
    signup_get: (req, res) => {
        res.send('Signup get');
    },
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
            // user,
            token: 'asd2fasf',
        });
    } catch (err) {
        // res.status(500).json({
        //   success: false,
        //   error: err.message,
        // });
        next(err);
        // console.log('err. signup' + err.message);
        // next(new ErrorResponse('email and password incorrect', 400));
    }
};
module.exports.login_get = (req, res) => {
    res.send('Login get');
};
module.exports.login_post = async (req, res, next) => {
    const { email, password } = req.body;
    //   console.log(email, password);
    if (!email || !password) {
        // res
        //   .status(400)
        //   .json({ success: false, error: 'Please provide email and password' });
        next(new ErrorResponse('Please provide email and password', 400));
    }

    try {
        const user = await User.findOne({ email }).select('+password');
        // console.log(user);
        if (!user) {
            // res.status(404).json({ success: false, error: 'Invalid credentials' });
            // return;
            next(new ErrorResponse('Invalid credentials', 404));
        }
        const isMatch = await user.matchPasswordsp(password);

        if (!isMatch) {
            // res.status(404).json({ success: false, error: 'Incorrect Password' });
            next(new ErrorResponse('Incorrect Password', 404));
        } else {
            res.status(200).json({
                success: true,
                token: 'asfaskldhfas',
            });
        }
    } catch (err) {
        // res.status(500).json({ success: false, error: err.message });
        next(err);
    }
};
module.exports.forgotpassword = (req, res, next) => {
    res.send('forgetpassword');
};
module.exports.resetpassword = (req, res, next) => {
    res.send('resetpassword');
};
