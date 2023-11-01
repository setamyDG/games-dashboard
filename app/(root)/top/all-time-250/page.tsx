import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getAllTime250Games } from '@/actions/games.actions';
import { NewGamesList } from '@/components/shared/NewGamesList/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    platforms?: string;
    page?: string;
  };
};

const AllTime250 = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getAllTime250Games(getUrl);
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <Image alt='homeIcon' src='/crown.svg' width={40} height={40} />
        <h1 className='headingText'>All time 250 games</h1>
      </div>
      <NewGamesList games={games} columns='3' withoutOrdering isSearch />
    </>
  );
};

export default AllTime250;
