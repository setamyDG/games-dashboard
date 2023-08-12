'use server';
import bcrypt from 'bcryptjs';
import { connectToDb } from '@/lib/mongodb';
import User from '@/models/user.model';

type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export const createUser = async (payload: CreateUserParams): Promise<void> => {
  try {
    await connectToDb();
    const { email, password, name } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
  } catch (error) {
    console.log('Error creating user: ', error);
  }
};

export const checkIfUserExists = async (email: string): Promise<boolean> => {
  try {
    await connectToDb();
    const user = await User.findOne({ email });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Error checking if user exists: ', error);
  }

  return false;
};
