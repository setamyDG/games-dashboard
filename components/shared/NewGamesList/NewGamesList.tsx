'use client';

// import { Pagination } from 'antd';
import { Input } from '@nextui-org/input';
import { Pagination } from '@nextui-org/pagination';
import { type Selection } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { orderOptions, platformOptions } from './const/selectOptions';
import { Props } from './NewGamesList.types';
import { GameCard } from '@/components/Game/GameCard/GameCard';

export const NewGamesList = ({ games, isSearch, withoutOrdering, withoutPlatforms }: Props): JSX.Element => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [ordering, setOrdering] = useState<Selection>(new Set([]));
  const [platforms, setPlatforms] = useState<Selection>(new Set([]));
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

  const handlePaginationChange = (value: number): void => {
    router.push(pathname + '?' + createQueryString('page', `${value}`));
  };

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    router.push(pathname + '?' + createQueryString('search', `${e.target.value}`));
  };

  const onChangeOrdering = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setOrdering(new Set([e.target.value]));
    if (e.target.value === 'None') {
      return;
    } else {
      router.push(pathname + '?' + createQueryString('ordering', `${e.target.value}`));
    }
  };

  const onChangePlatform = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPlatforms(new Set([e.target.value]));
    if (e.target.value === 'None') {
      return;
    } else {
      router.push(pathname + '?' + createQueryString('platforms', `${e.target.value}`));
    }
  };

  return (
    <>
      {games && games?.results.length > 0 ? (
        <>
          <div className='flex-col md:flex-row mt-4 flex gap-3 items-center'>
            {isSearch && (
              <Input
                startContent={<MagnifyingGlassIcon />}
                label='Search'
                placeholder='Enter your game'
                value={searchValue}
                onValueChange={setSearchValue}
                onChange={handleOnSearch}
                size='sm'
              />
            )}

            <>
              {!withoutOrdering && (
                <Select
                  selectedKeys={ordering}
                  onChange={onChangeOrdering}
                  label='Order By'
                  placeholder='Select an order'
                  size='sm'
                >
                  {orderOptions.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
              {!withoutPlatforms && (
                <Select
                  selectedKeys={platforms}
                  onChange={onChangePlatform}
                  label='Favorite Platform'
                  placeholder='Select an platform'
                  size='sm'
                >
                  {platformOptions.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:aut-fit gap-8 py-4'>
            {games?.results.map((game) => <GameCard key={game.id} game={game} />)}
          </div>
          <Pagination
            initialPage={1}
            page={Number(currentPage)}
            onChange={handlePaginationChange}
            total={games?.count}
            color='danger'
            size='lg'
            className='flex justify-center items-center mt-12'
          />
        </>
      ) : (
        <p>No games found</p>
      )}
    </>
  );
};
