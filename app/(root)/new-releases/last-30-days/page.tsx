import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getLast30daysGames } from '@/actions/games.actions';
import GamesList from '@/components/shared/GamesList';

const Last30Days = async () => {
  const games = await getLast30daysGames();
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className='headingText'>Last 30 days</h1>
      <GamesList games={games} columns={3} getFunction={getLast30daysGames} />
    </>
  );
};

export default Last30Days;
