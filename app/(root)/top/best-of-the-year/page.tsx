import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getBestOfTheYearGames } from '@/actions/games.actions';
import { NewGamesList } from '@/components/shared/NewGamesList/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    platforms?: string;
    page?: string;
  };
};

const BestOfTheYear = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getBestOfTheYearGames(getUrl);
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <Image alt='homeIcon' src='/win.svg' width={40} height={40} />
        <h1 className='headingText'>Best of the year</h1>
      </div>
      <NewGamesList games={games} columns='3' withoutOrdering isSearch />
    </>
  );
};

export default BestOfTheYear;
