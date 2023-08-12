/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react';
import { getGame, getGameScreenShots } from '@/actions/games.actions';
import Background from '@/components/Game/Background';
import Platforms from '@/components/shared/Plaforms';

type Props = {
  params: {
    slug: string;
  };
};

const GamePage = async ({ params }: Props) => {
  const { slug } = params;

  const game = await getGame(slug);
  const screenShots = await getGameScreenShots(slug);

  console.log('screenShots', screenShots);

  console.log('game', game);

  return (
    <>
      <Background src={game.background_image} />

      <div className='relative flex-col items-center pt-40 justify-center ' style={{ zIndex: 120 }}>
        <div className='flex items-center'>
          <h1 className='text-6xl font-bold '>{game?.name}</h1>
          <div className='flex items-center justify-center ml-8 rounded-full border-2 border-red-500 h-12 w-12'>
            <span className='text-red-500 font-semibold'>{game?.rating}</span>
          </div>
        </div>
        <div className='flex gap-4 mt-4 items-center'>
          <Platforms platforms={game?.platforms} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:aut-fit gap-8 pt-12'>
          {screenShots.results.map((screenShot: any) => (
            <Image
              key={screenShot.id}
              src={screenShot.image}
              width={400}
              height={300}
              priority
              alt={screenShot.id}
              className='border-2 rounded-xl border-red-500 shadow-xl'
            />
          ))}
        </div>
        <div className='mt-12'>
          <h1 className='text-4xl font-bold mb-4'>About</h1>
          {game?.description_raw}
        </div>
      </div>
    </>
  );
};

export default GamePage;
