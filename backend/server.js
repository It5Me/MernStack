require('dotenv').config({ path: './config.env' });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRouter');
const config = require('./config');
const { get } = require('lodash');
const connectdb = require('./config/db');
const errorHandler = require('./middleware/error');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectdb();
app.use(userRoute);
app.use(errorHandler);
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);

  //   const a = get(process, ['env', 'A']);
  //   console.log(process.env.A);
});
