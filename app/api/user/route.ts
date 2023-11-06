import { NextRequest, NextResponse } from 'next/server';
import { connectToDb } from '@/lib/mongodb';
import User from '@/models/user.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDb();
    const user = await User.find({});
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 });
  }
};
