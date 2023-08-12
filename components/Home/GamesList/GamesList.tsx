'use client';
import { Pagination } from 'antd';
import { useState } from 'react';
import { orderOptions, platformOptions } from '../const/selectOptions';
import GameCard from '../GameCard/GameCard';
import { useGetGames } from '../hooks/useGetGames';
import { Props } from './GamesList.types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useListQuery } from '@/hooks/useListQuery';
import { usePaginationHelpers } from '@/hooks/usePaginationHelper';

const GamesList = ({ games }: Props): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const { listQuery, setListQuery } = useListQuery();
  const { data, isFetching } = useGetGames(listQuery, games);

  const { handleOnChangeSearch, handleOnSearch, onChangePagination } = usePaginationHelpers(
    setListQuery,
    setSearchValue,
    searchValue,
  );

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const onChangeOrder = (value: string): void => {
    setListQuery((prev) => ({
      ...prev,
      current: 1,
      orderBy: value,
    }));
  };

  const onChangePlatform = (value: string): void => {
    setListQuery((prev) => ({
      ...prev,
      current: 1,
      platforms: value,
    }));
  };

  return (
    <>
      {data && data?.results.length > 0 ? (
        <>
          <div className='mt-4 flex gap-3 items-center'>
            <Input placeholder='Search' value={searchValue} onSearch={handleOnSearch} onChange={handleOnChangeSearch} />
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
          <div className='grid grid-cols-1 md:grid-cols-2 lg:aut-fit gap-8 py-4'>
            {data?.results.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
          <Pagination
            defaultCurrent={1}
            current={listQuery.current}
            onChange={onChangePagination}
            total={data?.count}
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
