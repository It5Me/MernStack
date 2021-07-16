module.exports = {
    PORT: process.env.PORT || 8000,
    mongodbURI: process.env.mongodbURI,
    jwt_secret: process.env.jwt_secret,
    jwt_expire: process.env.jwt_expire,
    email_service: process.env.service,
    email_username: process.env.user,
    email_password: process.env.pass,
    email_from: process.env.from,
};
