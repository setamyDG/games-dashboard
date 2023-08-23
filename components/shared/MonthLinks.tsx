'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { generateMonths } from '@/utils/methots';

const MonthsLinks = (): JSX.Element => {
  const links = generateMonths();
  const pathname = usePathname();

  const checkIActive = (path: string): boolean => {
    if (pathname.includes(path)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='flex gap-4 items-center my-4'>
      {links.map((month) => (
        <Link
          className={`${checkIActive(month.label) && 'text-red-500'} hover:text-red-500`}
          href={{
            pathname: `${month.label}`,
            query: {
              dates: `${month.startDate},${month.endDate}`,
            },
          }}
          key={month.label}
        >
          {month.label}
        </Link>
      ))}
    </div>
  );
};

export default MonthsLinks;
