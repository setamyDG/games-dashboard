import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getLast30daysGames } from '@/actions/games.actions';
import NewGamesList from '@/components/shared/NewGamesList/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    ordering?: string;
    platforms?: string;
    page?: string;
  };
};

export const metadata: Metadata = {
  title: 'daasdasd',
  description: 'dupa',
};

const Last30Days = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getLast30daysGames(getUrl);
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className='headingText'>Last 30 days</h1>
      <NewGamesList games={games} columns='3' />
    </>
  );
};

export default Last30Days;
