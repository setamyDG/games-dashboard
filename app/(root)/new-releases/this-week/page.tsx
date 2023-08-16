import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getThisWeekGames } from '@/actions/games.actions';
import GamesList from '@/components/shared/GamesList';

const ThisWeek = async () => {
  const games = await getThisWeekGames();
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className='headingText'>This week</h1>
      <GamesList games={games} columns={3} getFunction={getThisWeekGames} />
    </>
  );
};

export default ThisWeek;
