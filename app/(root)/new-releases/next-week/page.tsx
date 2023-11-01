import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getNextWeekGames } from '@/actions/games.actions';
import { NewGamesList } from '@/components/shared/NewGamesList/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    ordering?: string;
    platforms?: string;
    page?: string;
  };
};

const NextWeek = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getNextWeekGames(getUrl);
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <Image alt='homeIcon' src='/next-week.svg' width={40} height={40} />
        <h1 className='headingText'>Next week</h1>
      </div>
      <NewGamesList games={games} columns='2' isSearch />
    </>
  );
};

export default NextWeek;
