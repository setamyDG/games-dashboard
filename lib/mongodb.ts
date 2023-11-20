import mongoose from 'mongoose';

export const connectToDb = async () => {
  mongoose.set('strictQuery', false);

  if (!process.env.MONGODB_URI) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    throw new Error('Error connecting to DB');
  }
};
