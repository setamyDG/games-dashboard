'use client';

import { Pagination } from '@nextui-org/pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { createQueryString } from '@/utils/createQueryString';

type Props = {
  total: number;
};

export const ListPagination = ({ total }: Props) => {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page');
  const router = useRouter();
  const pathname = usePathname();

  const handlePaginationChange = useCallback(
    (value: number): void => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      router.push(pathname + '?' + createQueryString(searchParams, 'page', `${value}`));
    },
    [router, pathname, searchParams],
  );

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
