import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getNextWeekGames } from '@/actions/games.actions';
import { fetchUsers } from '@/actions/user.actions';
import { NewGamesList } from '@/components/shared/NewGamesList/NewGamesList';
import { SearchParams } from '@/customTypes/general';
import { generateUrlFromQuery } from '@/utils/methots';

const NextWeek = async ({ searchParams }: SearchParams) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getNextWeekGames(getUrl);
  const session = await getServerSession();
  const users = await fetchUsers();
  const user = users.filter((user) => user.email === (session?.user?.email as string));

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <Image alt='nextWeekIconPage' src='/next-week.svg' width={30} height={30} priority />
        <h1 className='headingText'>Next week</h1>
      </div>
      <NewGamesList games={games} user={user[0]} />
    </>
  );
};

export default NextWeek;
