const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { resolveSoa } = require('dns');
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
        // res.status(201).json({
        //     success: true,
        //     // user,
        //     token: 'asd2fasf',
        // });
        sendToken(user, 201, res);
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
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            // res.status(404).json({ success: false, error: 'Incorrect Password' });
            next(new ErrorResponse('Incorrect Password', 404));
        } else {
            // res.status(200).json({
            //     success: true,
            //     token: 'asfaskldhfas',
            // });
            sendToken(user, 200, res);
        }
    } catch (err) {
        // res.status(500).json({ success: false, error: err.message });
        next(err);
    }
};
module.exports.forgotpassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse('Email could not be sent ', 404));
        }
        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:7000/passwordreset/${resetToken}`;

        const message = `<h1>Please go to this link to reset your password</h1>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;
        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                text: message,
            });

            res.status(200).json({
                success: true,
                data: 'Email Sent',
            });
        } catch (err) {
            user.resetpasswordToken = undefined;
            user.resetpasswordExpire = undefined;

            user.save();

            return next(new ErrorResponse('Email could not be send', 500));
        }
    } catch (err) {
        next(err);
    }
};
module.exports.resetpassword = async (req, res, next) => {
    const resetpasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    // same resetpasswordToken
    try {
        const user = await user.findOne({
            resetpasswordToken,
            resetpasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorResponse('Invalid Reset Token', 400));
        }

        user.password = req.body.password;
        user.resetpasswordToken = undefined;
        user.resetpasswordExpire = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            data: 'Password Reset Success',
        });
    } catch (err) {
        next(err);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignToken();
    res.status(statusCode).json({ success: true, token });
};
