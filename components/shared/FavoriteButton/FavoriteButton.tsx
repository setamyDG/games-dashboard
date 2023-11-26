'use client';

import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';

type Props = {
  isFavorite: boolean;
  isLoading: boolean;
  handleAddToFavorites: () => void;
  handleRemoveFromFavorites: () => void;
};

export const FavoriteButton = ({
  isFavorite,
  isLoading,
  handleAddToFavorites,
  handleRemoveFromFavorites,
}: Props): JSX.Element => {
  return (
    <Tooltip showArrow color='danger' content={isFavorite ? 'Unlike' : 'Like !'}>
      <Button
        isLoading={isLoading}
        isIconOnly
        color='danger'
        variant='shadow'
        aria-label='Like'
        onClick={() => (isFavorite ? handleRemoveFromFavorites() : handleAddToFavorites())}
      >
        {isFavorite ? <HeartFilledIcon /> : <HeartIcon />}
      </Button>
    </Tooltip>
  );
};
