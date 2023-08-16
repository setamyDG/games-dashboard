/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { GamesResult } from '@/customTypes/general';
import { ListQuery } from '@/customTypes/listQuery';
import { QueryKeys } from '@/utils/queryKeys.enum';

export const useGetGames = (
  listQuery: ListQuery,
  games: GamesResult,
  getFunction: (url?: string) => Promise<any>,
): UseQueryResult<GamesResult, Error> => {
  const { orderBy, searchText, current, platforms } = listQuery;
  let url = `&page=${current}&ordering=${orderBy}&search=${searchText}`;

  if (platforms) {
    url += `&platforms=${platforms}`;
  }

  return useQuery([QueryKeys.GamesList, searchText, orderBy, current, platforms], () => getFunction(url), {
    initialData: games,
  });
};
