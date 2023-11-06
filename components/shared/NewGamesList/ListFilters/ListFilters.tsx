'use client';

import { Input } from '@nextui-org/input';
import { type Selection } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { orderOptions, platformOptions } from '../const/selectOptions';

export const ListFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [ordering, setOrdering] = useState<Selection>(new Set([]));
  const [platforms, setPlatforms] = useState<Selection>(new Set([]));
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(String(searchParams));
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTimeout(() => {
      router.push(pathname + '?' + createQueryString('search', `${e.target.value}`));
    }, 2000);
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
    <div className='flex-col md:flex-row mt-4 flex gap-3 items-center'>
      <Input
        startContent={<MagnifyingGlassIcon />}
        label='Search'
        placeholder='Enter your game'
        value={searchValue}
        onValueChange={setSearchValue}
        onChange={handleOnSearch}
        onSubmit={handleOnSearch}
        size='sm'
      />

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

      <Select
        selectedKeys={platforms}
        onChange={onChangePlatform}
        label='Favorite Platform'
        placeholder='Select an platform'
        size='sm'
      >
        {platformOptions.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
