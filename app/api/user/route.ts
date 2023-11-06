import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { connectToDb } from '@/lib/mongodb';
import User from '@/models/user.model';

export const GET = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
    const user = await User.find({});
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }
  } catch (error) {
    return res.status(500).json({ error: 'cannot connect to db' });
  }
};
