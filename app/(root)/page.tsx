import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';
import { getGames } from '@/actions/games.actions';
import { NewGamesList } from '@/components/shared/NewGamesList/NewGamesList';
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
      <div className='flex gap-8 items-center'>
        <Image alt='homeIcon' src='/door.svg' width={40} height={40} />
        <h1 className='headingText'>New and trending</h1>
      </div>
      <p className='pageDescription'>Based on rawg.io API available games</p>
      <Suspense fallback={<div>Loading...</div>}>
        <NewGamesList games={games} columns='2' isSearch />
      </Suspense>
    </>
  );
};

export default HomePage;
