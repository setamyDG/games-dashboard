'use client';

import { ListFilters } from './ListFilters/ListFilters';
import { ListPagination } from './ListPagination/ListPagination';
import { Props } from './NewGamesList.types';
import { GameCard } from '@/components/Game/GameCard/GameCard';

export const NewGamesList = ({ games, user }: Props): JSX.Element => {
  const total = Math.floor(games?.count / 20);

  return (
    <>
      <ListFilters />
      {games && games?.results?.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 py-4'>
            {games?.results.map((game) => <GameCard key={game.id} game={game} user={user} />)}
          </div>
          <ListPagination total={total || 1} />
        </>
      ) : (
        <p>No games found</p>
      )}
    </>
  );
};
