module.exports = {
    PORT: process.env.PORT || 8000,
    mongodbURI: process.env.mongodbURI,
    jwt_secret: process.env.jwt_secret,
    jwt_expire: process.env.jwt_expire,
};
