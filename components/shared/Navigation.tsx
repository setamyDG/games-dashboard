'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { links } from '@/utils/links';

const Navigation = (): JSX.Element => {
  const pathname = usePathname();

  const currentMonth = new Date().toLocaleString('en-GB', { month: 'long' });
  const navigationLinks = links(currentMonth);

  const checkIActive = (path: string) => {
    if (pathname === path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <nav className='navigation' style={{ zIndex: 100 }}>
      {/* DESKTOP */}
      <div className='hidden xl:block'>
        {navigationLinks.map(({ title, children }) => (
          <div className='flex gap-3 flex-col my-4' key={title}>
            <p className='font-semibold text-lg text-red-500'>{title}</p>
            {children.map((link) => (
              <Link
                key={link.name}
                href={{
                  pathname: link.path,
                  query: link.query,
                }}
                className={`${checkIActive(link.path) && 'text-red-500'} flex items-center hover:text-red-500`}
              >
                {link.isPng ? (
                  <div className='mr-4 flex items-center justify-center rounded-lg'>
                    <Image src={link.image} width={30} height={30} alt='winIcon' className='text-red-500' />
                  </div>
                ) : (
                  <div className='mr-4 bg-neutral-700 p-2 flex items-center justify-center rounded-lg w-8 h-8'>
                    <Image src={link.image} width={12} height={12} alt='winIcon' className='text-red-500' />
                  </div>
                )}
                {link.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
