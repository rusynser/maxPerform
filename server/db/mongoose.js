// db/mongoose.js
import mongoose from 'mongoose';

const connectMongoose = async () => {
  try {
    await mongoose.connect('your_mongodb_uri', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('Error connecting to MongoDB with Mongoose:', error);
  }
};

export { connectMongoose };
