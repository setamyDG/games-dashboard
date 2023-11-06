import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { getGames } from '@/actions/games.actions';
import { User } from '@/actions/user.actions';
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

const fetchUsers = async () => {
  const response = await fetch(`http://localhost:3000/api/user`, {
    next: {
      tags: ['users'],
      revalidate: 0,
    },
  });

  if (!response.ok) {
    console.log('response', response);

    throw new Error('Something went wrong');
  }

  return response.json();
};

const HomePage = async ({ searchParams }: Props) => {
  const getUrl = generateUrlFromQuery(searchParams);
  const games = await getGames(getUrl);
  const session = await getServerSession();
  const users: User[] = await fetchUsers();

  if (!session) {
    redirect('/sign-in');
  }

  const user = users.filter((user) => user.email === (session?.user?.email as string));

  return (
    <section>
      <div className='flex gap-8 items-center'>
        <Image alt='homeIconPage' src='/door.svg' width={30} height={30} />
        <h1 className='headingText'>New and trending</h1>
      </div>
      <NewGamesList games={games} user={user[0]} />
    </section>
  );
};

export default HomePage;
