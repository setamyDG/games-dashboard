import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { Game } from '../GamesList/GamesList.types';
import { getGames } from '@/actions/games.actions';
import { QueryKeys } from '@/utils/queryKeys.enum';
import { operations } from '@/customTypes/apiTypes';
import { ListQuery } from '@/customTypes/listQuery';

export const useGetGames = (
  listQuery: ListQuery,
  games: Game[],
): UseQueryResult<operations['games_list']['responses']['200']['content']['application/json'], Error> => {
  const { orderBy, searchText, current, platforms } = listQuery;
  let url = `&page=${current}&ordering=${orderBy}&search=${searchText}`;

  if (platforms) {
    url += `&platforms=${platforms}`;
  }

  return useQuery(
    [
      QueryKeys.GamesList,
      listQuery.searchText,
      listQuery.orderBy,
      listQuery.pageSize,
      listQuery.current,
      listQuery.platforms,
    ],
    () => getGames(url),
    {
      initialData: games,
    },
  );
};
