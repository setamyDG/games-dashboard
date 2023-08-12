import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getGames } from '@/actions/games.actions';
import GamesList from '@/components/Home/GamesList/GamesList';

const HomePage = async () => {
  const games = await getGames();
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className='headingText'>New and trending</h1>
      <p className='pageDescription'>Based on rawg.io API available games</p>
      <GamesList games={games} />
    </>
  );
};

export default HomePage;