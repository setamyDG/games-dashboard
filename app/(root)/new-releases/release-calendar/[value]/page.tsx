import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getReleaseMothsCalendarGames } from '@/actions/games.actions';
import NewGamesList from '@/components/shared/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    ordering?: string;
    platforms?: string;
    page?: string;
    dates?: string;
  };
};

const ReleaseCalendar = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getReleaseMothsCalendarGames(getUrl);
  const session = await getServerSession();

  console.log('getUrl', getUrl);
  if (!session) {
    redirect('/sign-in');
  }

  return <NewGamesList games={games} columns='3' withoutFilters />;
};

export default ReleaseCalendar;
