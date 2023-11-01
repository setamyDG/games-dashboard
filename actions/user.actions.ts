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

export const addFavoriteGame = async (email: string, gameId: string): Promise<void> => {
  try {
    await connectToDb();
    await User.updateOne({ email }, { $push: { favorites: gameId } });
  } catch (error) {
    console.log('Error adding favorite game: ', error);
  }
};

export const removeFavoriteGame = async (email: string, gameId: string): Promise<void> => {
  try {
    await connectToDb();
    await User.updateOne({ email }, { $pull: { favorites: gameId } });
  } catch (error) {
    console.log('Error removing favorite game: ', error);
  }
};

export const getUser = async (email: string): Promise<void | null> => {
  try {
    await connectToDb();
    const user = await User.findOne({ email });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error getting user: ', error);
  }
};

export const updateBackgroundImage = async (email: string, backgroundImage: string): Promise<void> => {
  try {
    await connectToDb();
    const user = await User.findOne({ email });
    if (user) {
      await User.updateOne({ email }, { backgroundImage });
    }
  } catch (error) {
    console.log('Error updating background image: ', error);
  }
};
