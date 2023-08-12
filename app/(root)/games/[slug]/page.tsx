/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getGame, getGameScreenShots } from '@/actions/games.actions';
import Background from '@/components/Game/Background';
import Platforms from '@/components/shared/Plaforms';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: {
    slug: string;
  };
};

const GamePage = async ({ params }: Props) => {
  const { slug } = params;

  const game = await getGame(slug);
  const screenShots = await getGameScreenShots(slug);

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
        <div className='grid grid-cols-1 md:grid-cols-4 lg:aut-fit gap-8 pt-12'>
          {screenShots.results.map((screenShot: any) => (
            <Image
              key={screenShot.id}
              src={screenShot.image}
              width={400}
              height={300}
              priority
              alt={screenShot.id}
              className='rounded-xl shadow-xl'
            />
          ))}
        </div>
        <div className='flex h-screen'>
          <div className='w-1/2 relative hidden md:block'>
            <div className='mt-16'>
              <h1 className='mb-4'>About</h1>
              <span className=''>{game?.description_raw}</span>
            </div>
          </div>
          <div className='flex-1'>
            <div className='mt-16 ml-4'>
              <h1>Where to buy</h1>
              <div className='flex gap-4 mt-4'>
                {game?.stores.map((store: any) => {
                  console.log('store', store);
                  return (
                    <Link href={store?.store?.domain} key={store.id}>
                      <Button key={store?.id}>{store.store.name}</Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
