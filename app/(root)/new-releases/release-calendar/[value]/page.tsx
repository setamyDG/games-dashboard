import { CalendarIcon } from '@radix-ui/react-icons';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getReleaseMothsCalendarGames } from '@/actions/games.actions';
import { MonthsLinks } from '@/components/shared/MonthLinks';
import { NewGamesList } from '@/components/shared/NewGamesList/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    ordering?: string;
    platforms?: string;
    page?: string;
    dates?: string;
  };
  params: {
    value: string;
  };
};

const ReleaseCalendar = async ({ searchParams, params }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getReleaseMothsCalendarGames(getUrl);
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <CalendarIcon className='w-12 h-12' />
        <h1 className='headingText'>{params.value}</h1>
      </div>
      <MonthsLinks />
      <NewGamesList games={games} />
    </>
  );
};

export default ReleaseCalendar;
