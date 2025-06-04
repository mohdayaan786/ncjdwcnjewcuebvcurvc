const express = require('express');
const connect = require('./config/database');
const passport = require('passport');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const { connectRedis } = require('./config/redis');

const app = express();
const PORT = process.env.PORT;
const ApiRoutes = require('./routes/index');

require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

const startServer = async () => {
  try {
    await connectRedis(); // Connect Redis once here

    // Import and use rateLimiter AFTER Redis connection is ready
    const rateLimiter = require('./middlewares/rateLimiter');
    app.use(rateLimiter);

    app.use('/api', ApiRoutes);

    await connect(); // Connect MongoDB

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server failed to start:', err);
  }
};

startServer();
