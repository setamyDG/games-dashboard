import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getGames } from '@/actions/games.actions';
import NewGamesList from '@/components/shared/NewGamesList/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    search?: string;
    ordering?: string;
    platforms?: string;
    page?: string;
  };
};

const HomePage = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getGames(getUrl);
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className='headingText'>New and trending</h1>
      <p className='pageDescription'>Based on rawg.io API available games</p>
      <NewGamesList games={games} columns='2' isSearch />
    </>
  );
};

export default HomePage;
