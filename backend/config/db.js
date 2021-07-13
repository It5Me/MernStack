const mongoose = require('mongoose');
const config = require('../config');
const connectdb = async () => {
  await mongoose.connect(config.mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log('Connected to MongoDB');
};

module.exports = connectdb;
