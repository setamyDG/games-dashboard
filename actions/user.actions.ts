'use server';

import bcrypt from 'bcryptjs';
import { revalidateTag } from 'next/cache';
import { Game } from '@/customTypes/general';
import { connectToDb } from '@/lib/mongodb';
import { baseUrl } from '@/lib/utils';
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
    await User.create({
      name,
      email,
      password: hashedPassword,
      favorites: [],
      backgroundImage: 'https://media.rawg.io/media/screenshots/c71/c718076de2326247d29ea5ed32e67c6c.jpg',
      image: '',
    });
  } catch (error) {
    throw new Error('Error creating user');
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
    throw new Error('Error checking if user exists');
  }

  return false;
};

export const addFavoriteGame = async (email: string, game: Game): Promise<void> => {
  try {
    await connectToDb();
    await User.findOneAndUpdate(
      { email },
      {
        $push: {
          favorites: game,
        },
      },
    );
    revalidateTag('users');
  } catch (error) {
    throw new Error('Error adding favorite game');
  }
};

export const removeFavoriteGame = async (email: string, game: Game): Promise<void> => {
  try {
    await connectToDb();
    await User.findOneAndUpdate({ email }, { $pull: { favorites: game } });
  } catch (error) {
    throw new Error('Error removing favorite game');
  }
  revalidateTag('users');
};

export type User = {
  name: string;
  email: string;
  favorites: Game[];
  backgroundImage: string;
};

export const updateBackgroundImage = async (email: string, backgroundImage: string): Promise<void> => {
  try {
    await connectToDb();
    await User.findOneAndUpdate({ email }, { $set: { backgroundImage } }, { new: true });
  } catch (error) {
    throw new Error('Error updating background image');
  }
  revalidateTag('users');
};

export const fetchUsers = async () => {
  const response = await fetch(`${baseUrl}/api/user`, {
    next: {
      tags: ['users'],
    },
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
};
