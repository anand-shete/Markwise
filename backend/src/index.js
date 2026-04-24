require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const staticRoute = require('./routes/staticRoute');
const studentRoute = require('./routes/studentRoute');
const teacherRoute = require('./routes/teacherRoute');
const adminRoute = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  );

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/v1', staticRoute);
  app.use('/api/v1/admin', adminRoute);
  app.use('/api/v1/student', studentRoute);
  app.use('/api/v1/teacher', teacherRoute);

  app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));
})();
