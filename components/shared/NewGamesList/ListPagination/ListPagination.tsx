'use client';

import { Pagination } from '@nextui-org/pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

type Props = {
  total: number;
};

export const ListPagination = ({ total }: Props) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page');
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <Pagination
      initialPage={1}
      page={Number(currentPage)}
      onChange={handlePaginationChange}
      total={total || 1}
      color='danger'
      size='lg'
      className='flex justify-center items-center mt-12'
    />
  );
};
