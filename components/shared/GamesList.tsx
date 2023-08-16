'use client';

import { Pagination } from 'antd';
import { useState } from 'react';
import { orderOptions, platformOptions } from '../Home/const/selectOptions';
import GameCard from '../Home/GameCard/GameCard';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GamesResult } from '@/customTypes/general';
import { useGetGames } from '@/hooks/useGetGames';
import { useListQuery } from '@/hooks/useListQuery';
import { usePaginationHelpers } from '@/hooks/usePaginationHelper';

type Props = {
  games: GamesResult;
  getFunction: () => Promise<GamesResult>;
  isSearch?: boolean;
  columns: string;
  isCalendar?: boolean;
};

const GamesList = ({ games, getFunction, isSearch, columns }: Props): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const { listQuery, setListQuery } = useListQuery();
  const { data, isFetching } = useGetGames(listQuery, games, getFunction);
  const { handleOnChangeSearch, handleOnSearch, onChangePagination, onChangeOrder, onChangePlatform } =
    usePaginationHelpers(setListQuery, setSearchValue, searchValue);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data && data?.results.length > 0 ? (
        <>
          <div className='mt-4 flex gap-3 items-center'>
            {isSearch && (
              <Input
                placeholder='Search'
                value={searchValue}
                onSearch={handleOnSearch}
                onChange={handleOnChangeSearch}
              />
            )}
            <Select value={listQuery.orderBy} onValueChange={onChangeOrder}>
              <SelectTrigger>
                <SelectValue placeholder='Order By' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Order by</SelectLabel>
                  {orderOptions.map((option) => (
                    <SelectItem key={option.label} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={listQuery.platforms} onValueChange={onChangePlatform}>
              <SelectTrigger>
                <SelectValue placeholder='Platforms' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Platforms</SelectLabel>
                  {platformOptions.map((option) => (
                    <SelectItem key={option.label} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-${columns} lg:aut-fit gap-8 py-4`}>
            {data?.results.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
          <Pagination
            defaultCurrent={1}
            current={listQuery.current}
            onChange={onChangePagination}
            total={games?.count}
            showSizeChanger={false}
            className='flex justify-center items-center mt-12'
          />
        </>
      ) : (
        <p>No games found</p>
      )}
    </>
  );
};

export default GamesList;
