'use client';

import React, { useState } from 'react';
import { User, addFavoriteGame, removeFavoriteGame } from '@/actions/user.actions';
import { FavoriteButton } from '@/components/shared/FavoriteButton/FavoriteButton';
import { Game } from '@/customTypes/general';

type Props = {
  user?: User;
  game: Game;
};
export const GameFavoriteButton = ({ user, game }: Props) => {
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
    <FavoriteButton
      isFavorite={isFavorite}
      isLoading={isLoading}
      handleAddToFavorites={handleAddToFavorites}
      handleRemoveFromFavorites={handleRemoveFromFavorites}
    />
  );
};
