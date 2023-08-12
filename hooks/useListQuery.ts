'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { ListQuery } from '@/customTypes/listQuery';

type UseListQuery = {
  listQuery: ListQuery;
  setListQuery: Dispatch<SetStateAction<ListQuery>>;
  defaultConfig: ListQuery;
};

export const defaultConfig = {
  searchText: '',
  current: 1,
  pageSize: 20,
  orderBy: '',
  platforms: '',
};

export const useListQuery = (): UseListQuery => {
  const [listQuery, setListQuery] = useState<ListQuery>(defaultConfig);

  return {
    defaultConfig,
    listQuery,
    setListQuery,
  };
};
