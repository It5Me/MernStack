const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { username: '', email: '', password: '' };
    error.message = err.message;

    if (err.code === 11000) {
        const message = 'Duplicate Field Value Enter';
        error = new ErrorResponse(message, 400);
    }
    if (err.message.includes('ValidationError')) {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }
    if (err.message.includes('user validation failed')) {
        console.log('hello');
        console.log('err.errors   ' + err);
        Object.values(err.errors).forEach(({ properties }) => {
            //   console.log(properties.message);
            //   console.log(properties.path);
            error[properties.path] = properties.message;
            const message = properties.message;
            error = new ErrorResponse(message, 400);
        });
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

module.exports = errorHandler;
