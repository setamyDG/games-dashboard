/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getGame, getGameScreenShots, getGameSeries, getGameAchievements } from '@/actions/games.actions';
import AchievementCard from '@/components/Game/AchievementCard/AchievementCard';
import Background from '@/components/Game/Background';
import GameCard from '@/components/Game/GameCard/GameCard';
import Platforms from '@/components/Game/Platforms/Platforms';
import Screenshots from '@/components/Game/Screenshots';
import { Button } from '@/components/ui/button';
import 'react-photo-view/dist/react-photo-view.css';

type Props = {
  params: {
    slug: string;
  };
};

const GamePage = async ({ params }: Props) => {
  const { slug } = params;

  const game = await getGame(slug);
  const screenShots = await getGameScreenShots(slug);
  const gameSeries = await getGameSeries(slug);
  const gameAchievements = await getGameAchievements(slug);

  return (
    <>
      <Background src={game.background_image} />
      <div className='relative flex-col items-center py-40 justify-center ' style={{ zIndex: 120 }}>
        <div className='flex items-center'>
          <h1 className='text-6xl font-bold '>{game?.name}</h1>
          <div className='flex items-center justify-center ml-8 rounded-full h-12 w-12 border-2 border-red-500'>
            <span className='text-red-500 font-semibold'>{game?.rating}</span>
          </div>
        </div>
        <div className='flex gap-4 mt-4 items-center'>
          <Platforms platforms={game?.platforms} />
        </div>
        <div className='mt-8 flex items-center gap-8'>
          <div className='flex flex-col'>
            <span>Release date:</span>
            <span className='text-red-500'>{game?.released}</span>
          </div>
          <div className='flex flex-col text-sm'>
            <span># {game?.rating_top}</span>
            <span className='text-red-500 underline underline-offset-2'>TOP 2023</span>
          </div>
          <Link href={game?.website}>
            <Button>Official website</Button>
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 lg:aut-fit gap-8 pt-12'>
          <Screenshots screenShots={screenShots} />
        </div>
        <div className='mt-12'>
          <h1 className='mb-4 font-semibold text-red-500'>About</h1>
          <span className=''>{game?.description_raw}</span>
        </div>
        <div className='mt-8'>
          <h1 className='font-semibold text-red-500'>Series</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:aut-fit gap-4'>
            {gameSeries.results.map((game: any) => (
              <GameCard key={game.id} game={game} isSeries />
            ))}
          </div>
        </div>
        <div className='mt-12'>
          <h1 className='font-semibold text-red-500'>Hardest achievements</h1>
          <div className='grid grid-cols-1 md:grid-cols-4 lg:aut-fit gap-4'>
            {gameAchievements.results.map((achievement: any) => (
              <AchievementCard key={game.id} achievement={achievement} />
            ))}
          </div>
        </div>
        <div className='mt-12'>
          <h1 className='font-semibold text-red-500'>Genres</h1>
          <div className='flex'>
            {game?.genres.map((genre: any) => (
              <div key={genre.id} className='flex mt-4 mr-4 flex-col'>
                <Image
                  src={genre.image_background}
                  width={200}
                  height={200}
                  alt={genre.name}
                  className='rounded-xl h-32 w-48 object-cover'
                />
                <span>{genre.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='mt-12'>
          <h1 className='font-semibold text-red-500'>Where to buy</h1>
          <div className='flex gap-4 mt-4'>
            {game?.stores.map((store: any) => {
              return (
                <Link href={store?.store?.domain} key={store.id}>
                  <Button className='text-xs px-8' key={store?.id}>
                    {store.store.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
