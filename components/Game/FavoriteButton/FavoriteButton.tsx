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
  // const [isFavorite, setIsFavorite] = useState<boolean>(
  //   user?.favorites?.some((favorite) => favorite.id === game.id) || false,
  // );
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const handleAddToFavorites = async () => {
  //   try {
  //     setIsLoading(true);
  //     await addFavoriteGame(user?.email as string, game);
  //     setIsFavorite(true);
  //   } catch (error) {
  //     console.error('Error adding to favorites', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleRemoveFromFavorites = async () => {
  //   try {
  //     setIsLoading(true);
  //     await removeFavoriteGame(user?.email as string, game);
  //     setIsFavorite(false);
  //   } catch (error) {
  //     console.error('Error removing from favorites:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
