const mongoose = require('mongoose');
const { config } = require('dotenv');
config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
