const mongoose = require('mongoose');
const crypto = require('crypto');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'Please provide a username '],
        unique: true,
    },
    email: {
        type: String,
        require: [true, 'Please provide an email'],
        unique: true,
        validate: [isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        require: [true, 'Please enter a password'],
        minLength: [8, 'Minimum password length is 8 characters'],
        select: false,
    },
    resetpasswordToken: String,
    resetpasswordExpire: Date,
});
// hashing
userSchema.pre('save', async function (next) {
    // if user change password
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.getSignToken = function () {
    return jwt.sign({ id: this._id }, config.jwt_secret, { expiresIn: config.jwt_expire });
};
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetpasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetpasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
