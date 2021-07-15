const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const config = require('../config');
const User = require('../models/User');
const protect = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    console.log(req.method);
    if (req.headers.authorization && req.headers.authorization.startsWith('Itme')) {
        token = req.headers.authorization.split(' ')[1];
        console.log(token);
    }
    if (!token) {
        return next(new ErrorResponse('Not authorization to access this route', 401));
    }

    try {
        console.log('hey');
        const decoded = jwt.verify(token, config.jwt_secret);
        const user = await User.findById(decoded.id);
        console.log(user);
        if (!user) {
            return next(new ErrorResponse('No user found with this id', 404));
        }
        // console.log(req.user);
        req.user = user;
        // console.log(req.user);
        next();
    } catch (err) {
        console.log('err  ', err.message);
        return next(new ErrorResponse('Not authorization to access this route', 401));
    }
};

module.exports = { protect };
