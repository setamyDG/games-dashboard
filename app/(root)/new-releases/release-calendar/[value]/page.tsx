import { CalendarIcon } from '@radix-ui/react-icons';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getReleaseMothsCalendarGames } from '@/actions/games.actions';
import { fetchUsers } from '@/actions/user.actions';
import { MonthsLinks } from '@/components/shared/MonthLinks';
import { NewGamesList } from '@/components/shared/NewGamesList/NewGamesList';
import { SearchParams } from '@/customTypes/general';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  params: {
    value: string;
  };
};

const ReleaseCalendar = async ({ searchParams, params }: Props & SearchParams) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getReleaseMothsCalendarGames(getUrl);
  const session = await getServerSession();
  const users = await fetchUsers();
  const user = users.filter((user) => user.email === (session?.user?.email as string));

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
      <NewGamesList games={games} user={user[0]} />
    </>
  );
};

export default ReleaseCalendar;
