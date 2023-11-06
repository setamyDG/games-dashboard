import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getGame, getGameScreenShots, getGameSeries, getGameAchievements } from '@/actions/games.actions';
// import { User, fetchUsers } from '@/actions/user.actions';
import { Background } from '@/components/Game/Background/Background';
import { BuyButton } from '@/components/Game/BuyButton/BuyButton';
import { GameDetailsTabs } from '@/components/Game/GameDetailsTabs/GameDetailsTabs';
// import { GameFavoriteButton } from '@/components/Game/GameFavoriteButton/GameFavoriteButton';
import { Platforms } from '@/components/Game/Platforms/Platforms';
import { Screenshots } from '@/components/Game/Screenshots';
import 'react-photo-view/dist/react-photo-view.css';
import { BackButton } from '@/components/shared/BackButton';

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({ params }: Props) => {
  return {
    title: `Game | ${params.slug}`,
    description: `Game ${params.slug} description`,
  };
};

const GamePage = async ({ params }: Props) => {
  const { slug } = params;
  const session = await getServerSession();
  const game = await getGame(slug);
  const screenShots = await getGameScreenShots(slug);
  const gameSeries = await getGameSeries(slug);
  const gameAchievements = await getGameAchievements(slug);
  // const users: User[] = await fetchUsers();

  // const user = users.filter((user) => user.email === (session?.user?.email as string));

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <Background src={game.background_image as string} />
      <div className='relative flex-col items-center py-40 justify-center ' style={{ zIndex: 120 }}>
        <div className='absolute top-0'>
          <BackButton />
        </div>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl md:text-4xl font-bold '>{game?.name}</h1>
          <div className='flex items-center justify-center ml-2 md:ml-8 rounded-full h-12 w-12 border-2 border-red-500'>
            <span className='text-red-500 font-semibold'>{game?.rating}</span>
          </div>
        </div>
        <div className='flex gap-4 mt-4 items-center'>
          <Platforms platforms={game?.platforms} />
        </div>
        <div className='mt-8 flex flex-col md:flex-row md:items-center gap-4'>
          <div className='flex flex-row gap-4 md:flex-col md:gap-0'>
            <span>Release date:</span>
            <span className='text-red-500'>{game?.released}</span>
          </div>
          <div className='flex flex-row gap-4 md:flex-col md:gap-0 text-sm'>
            <span># {game?.rating_top}</span>
            <span className='text-red-500 underline underline-offset-2'>TOP 2023</span>
          </div>
          <div className='flex gap-4 items-center md:contents'>
            {/* <GameFavoriteButton game={game} user={user[0]} /> */}
            <Tooltip content='Visit official game page' showArrow color='secondary'>
              <Link href={game?.website as string}>
                <Button variant='shadow' color='secondary'>
                  Official website
                </Button>
              </Link>
            </Tooltip>
            <BuyButton slug={`/games/${game?.slug}`} game={game} placement='top' />
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-8 pt-12'>
          <Screenshots screenShots={screenShots} />
        </div>
        <div className='mt-12'>
          <GameDetailsTabs about={game?.description_raw} gameSeries={gameSeries} gameAchievements={gameAchievements} />
        </div>
      </div>
    </>
  );
};

export default GamePage;
