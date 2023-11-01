import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getPopular2022Games } from '@/actions/games.actions';
import { NewGamesList } from '@/components/shared/NewGamesList/NewGamesList';
import { generateUrlFromQuery } from '@/utils/methots';

type Props = {
  searchParams: {
    platforms?: string;
    page?: string;
    ordering?: string;
  };
};

const PopularIn2022 = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getPopular2022Games(getUrl);
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <Image alt='homeIcon' src='/chart.svg' width={40} height={40} />
        <h1 className='headingText'>Popular in 2022</h1>
      </div>
      <NewGamesList games={games} columns='3' isSearch withoutOrdering />
    </>
  );
};

export default PopularIn2022;
