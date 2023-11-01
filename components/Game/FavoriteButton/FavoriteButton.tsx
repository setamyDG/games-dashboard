'use client';

import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

export const FavoriteButton = (): JSX.Element => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Tooltip showArrow color='danger' content={isFavorite ? 'Unlike' : 'Like !'}>
      <Button isIconOnly color='danger' variant='shadow' aria-label='Like' onClick={handleAddToFavorites}>
        {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
      </Button>
    </Tooltip>
  );
};
