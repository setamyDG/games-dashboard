import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getLast30daysGames } from '@/actions/games.actions';
import { User, fetchUsers } from '@/actions/user.actions';
import { NewGamesList } from '@/components/shared/NewGamesList/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    ordering?: string;
    platforms?: string;
    page?: string;
  };
};

export const metadata: Metadata = {
  title: 'Last 30 days',
  description: 'Best games from last 30 days',
};

const Last30Days = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getLast30daysGames(getUrl);
  const session = await getServerSession();
  const users: User[] = await fetchUsers();
  const user = users.filter((user) => user.email === (session?.user?.email as string));

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <Image alt='starIconPage' src='/star.svg' width={30} height={30} />
        <h1 className='headingText'>Last 30 days</h1>
      </div>
      <NewGamesList games={games} user={user[0]} />
    </>
  );
};

export default Last30Days;
