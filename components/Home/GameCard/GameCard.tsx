'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Props } from './GameCard.types';
import Platforms from '@/components/shared/Plaforms';

const GameCard = ({ game }: Props): JSX.Element => {
  const router = useRouter();

  return (
    <div
      className='flex flex-col mt-4 hover:scale-105 transition-all cursor-pointer overflow-hidden'
      key={game?.name as string}
    >
      <Image
        src={game?.background_image || '/game.svg'}
        alt={game?.name as string}
        width={1920}
        height={1080}
        priority
        className='rounded-tr-lg rounded-tl-lg object-cover'
      />
      <div className='flex flex-col p-4 bg-neutral-800 rounded-br-lg rounded-bl-lg'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4 items-center'>
            <Platforms platforms={game?.platforms} />
          </div>
          <div className='hidden xl:block'>
            {game?.metacritic && (
              <div className='flex items-center border border-red-500 py-1 px-2'>
                <p className='text-red-500'>Metacritic: {game?.metacritic}</p>
              </div>
            )}
          </div>
        </div>
        <div className='mt-4'>
          <span
            className='text-white text-xl font-semibold hover:text-red-500'
            onClick={() => router.push(`/games/${game?.slug}`)}
          >
            {game?.name}
          </span>
          <p className='text-white text-sm mt-4'>Rating: {game?.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
