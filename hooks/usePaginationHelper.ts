import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ListQuery } from '@/customTypes/listQuery';

type UsePaginationHelpers = {
  handleOnChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnSearch: () => void;
  onChangePagination: (page: number) => void;
  onChangeOrder: (value: string) => void;
  onChangePlatform: (value: string) => void;
};

export const usePaginationHelpers = (
  setListQuery: Dispatch<SetStateAction<ListQuery>>,
  setSearchValue?: Dispatch<SetStateAction<string>>,
  customSearchValue?: string,
): UsePaginationHelpers => {
  const handleOnSearch = (): void => {
    setListQuery((prev) => ({
      ...prev,
      searchText: customSearchValue,
      current: 1,
    }));
  };

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue?.(e.target.value);
  };

  const onChangePagination = (page: number): void => {
    setListQuery((prev) => ({
      ...prev,
      current: page,
    }));
  };

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

  return {
    handleOnChangeSearch,
    handleOnSearch,
    onChangePagination,
    onChangeOrder,
    onChangePlatform,
  };
};
