import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getBestOfTheYearGames } from '@/actions/games.actions';
import { User, fetchUsers } from '@/actions/user.actions';
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
  const users: User[] = await fetchUsers();
  const user = users.filter((user) => user.email === (session?.user?.email as string));

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <Image alt='winIconPage' src='/win.svg' width={30} height={30} priority />
        <h1 className='headingText'>Best of the year</h1>
      </div>
      <NewGamesList games={games} user={user[0]} />
    </>
  );
};

export default BestOfTheYear;
