import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getNextWeekGames } from '@/actions/games.actions';
import GamesList from '@/components/shared/GamesList';

const ReleaseCalendar = async () => {
  const games = await getNextWeekGames();
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className='headingText'>Release Calendar</h1>
      <GamesList games={games} columns='3' getFunction={getNextWeekGames} />
    </>
  );
};

export default ReleaseCalendar;
