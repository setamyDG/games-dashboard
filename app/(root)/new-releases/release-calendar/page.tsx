import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
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

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className='headingText'>Release Calendar</h1>
      <NewGamesList games={games} columns='3' />
    </>
  );
};

export default ReleaseCalendar;
