import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ListQuery } from '@/customTypes/listQuery';

type UsePaginationHelpers = {
  handleOnChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnSearch: () => void;
  onChangePagination: (page: number) => void;
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

  return {
    handleOnChangeSearch,
    handleOnSearch,
    onChangePagination,
  };
};
