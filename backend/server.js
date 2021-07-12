require('dotenv').config({ path: './config.env' });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRouter');
const app = express();
const PORT = process.env.PORT || 7000;

app.use(userRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
