'use client';

import { Card, CardFooter } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Tooltip } from '@nextui-org/tooltip';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FavoriteButton } from '../../shared/FavoriteButton/FavoriteButton';
import { BuyButton } from '../BuyButton/BuyButton';
import { NavigationButtonLink } from '../NavigationButtonLink/NavigationButtonLink';
import { Platforms } from '../Platforms/Platforms';
import { Props } from './GameCard.types';
import { addFavoriteGame, removeFavoriteGame } from '@/actions/user.actions';

export const GameCard = ({ game, user }: Props): JSX.Element => {
  const [isFavorite, setIsFavorite] = useState<boolean>(
    user?.favorites?.some((favoriteGame) => favoriteGame.id === game?.id) || false,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddToFavorites = async () => {
    try {
      setIsLoading(true);
      await addFavoriteGame(user?.email as string, game);
      setIsFavorite(true);
    } catch (error) {
      console.error('Error adding to favorites', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      setIsLoading(true);
      await removeFavoriteGame(user?.email as string, game);
      setIsFavorite(false);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      isFooterBlurred
      radius='lg'
      className='border-none flex flex-col mt-4 hover:opacity-100 hover:scale-105 transition-all overflow-hidden relative opacity-80 h-unit-7xl'
    >
      <Image
        src={game?.background_image || '/game.svg'}
        alt={game?.name as string}
        width={1920}
        height={1080}
        priority
        className='h-full object-cover'
      />
      <div className='absolute top-2 right-2 flex gap-2 items-center flex-col drop-shadow-[2px_3px_4px_#373737]'>
        <div className='flex gap-2'>
          <FavoriteButton
            isFavorite={isFavorite}
            isLoading={isLoading}
            handleAddToFavorites={handleAddToFavorites}
            handleRemoveFromFavorites={handleRemoveFromFavorites}
          />
          <NavigationButtonLink slug={`/games/${game?.slug}`} name={game?.name as string} />
        </div>
        <BuyButton slug={`/games/${game?.slug}`} game={game} />
        <div className='flex gap-1'>
          <Tooltip color='secondary' content='Metacritic score' showArrow placement='left'>
            <Chip color='secondary' size='sm' variant='shadow'>
              {game?.metacritic || 0}
            </Chip>
          </Tooltip>
          <Tooltip color='primary' content='Game general rating' showArrow placement='bottom'>
            <Chip color='primary' size='sm' variant='shadow'>
              {game?.rating}
            </Chip>
          </Tooltip>
        </div>
        <Tooltip color='primary' content='Game general rating' showArrow placement='bottom'>
          <Chip color='warning' size='sm' variant='shadow'>
            {game?.released}
          </Chip>
        </Tooltip>
      </div>
      <CardFooter className='gap-2 overflow-hidden absolute bottom-0 w-full z-10 flex flex-col items-center'>
        <div className='flex'>
          <Link className='text-lg font-semibold ' href={`/games/${game?.slug}`}>
            {game?.name}
          </Link>
        </div>
        <div className='flex justify-between items-center gap-4'>
          <Platforms platforms={game?.platforms} />
        </div>
      </CardFooter>
    </Card>
  );
};
