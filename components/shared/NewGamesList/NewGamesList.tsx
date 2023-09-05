'use client';

import { Pagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { orderOptions, platformOptions } from './const/selectOptions';
import { Props } from './NewGamesList.types';
import GameCard from '@/components/Game/GameCard/GameCard';
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

const NewGamesList = ({ games, columns, isSearch, withoutOrdering, withoutPlatforms }: Props): JSX.Element => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [ordering, setOrdering] = useState(searchParams.get('ordering') || '');
  const [platforms, setPlatforms] = useState(searchParams.get('platforms') || '');
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = searchParams.get('page');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(String(searchParams));
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handlePaginationChange = (value: number): void => {
    router.push(pathname + '?' + createQueryString('page', `${value}`));
  };

  const handleOnSearch = (): void => {
    router.push(pathname + '?' + createQueryString('search', `${searchValue}`));
  };

  const onChangeOrdering = (value: string): void => {
    setOrdering(value);
    router.push(pathname + '?' + createQueryString('ordering', `${value}`));
  };

  const onChangePlatform = (value: string): void => {
    setPlatforms(value);
    router.push(pathname + '?' + createQueryString('platforms', `${value}`));
  };

  return (
    <>
      {games && games?.results.length > 0 ? (
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

            <>
              {!withoutOrdering && (
                <Select value={ordering} onValueChange={onChangeOrdering}>
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
              )}
              {!withoutPlatforms && (
                <Select value={platforms} onValueChange={onChangePlatform}>
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
              )}
            </>
          </div>
          <div
            className={`${
              columns === '2'
                ? `grid grid-cols-1 md:grid-cols-2 lg:aut-fit gap-8 py-4`
                : `grid grid-cols-1 md:grid-cols-${columns} lg:aut-fit gap-8 py-4`
            }`}
          >
            {games?.results.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
          <Pagination
            defaultCurrent={1}
            current={Number(currentPage)}
            onChange={handlePaginationChange}
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

export default NewGamesList;
