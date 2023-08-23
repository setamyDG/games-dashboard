import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getThisWeekGames } from '@/actions/games.actions';
import NewGamesList from '@/components/shared/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    ordering?: string;
    platforms?: string;
    page?: string;
  };
};

const ThisWeek = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getThisWeekGames(getUrl);
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className='headingText'>This week</h1>
      <NewGamesList games={games} columns='2' isSearch />
    </>
  );
};

export default ThisWeek;
