const express = require('express');
const connect = require('./config/database');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
const rateLimiter = require('./middlewares/rateLimiter');

const dotenv = require('dotenv');
dotenv.config();
require('./config/passport')(passport);

const PORT = process.env.PORT;
const ApiRoutes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(rateLimiter); 

app.use('/api', ApiRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
});