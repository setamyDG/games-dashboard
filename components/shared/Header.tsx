'use client';

import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { ModeToggle } from './ThemeToggle';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

const Header = (): JSX.Element => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const pathname = usePathname();

  const checkIActive = (path: string) => {
    if (pathname === path) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <header className='header' style={{ zIndex: 100 }}>
      <Image src='/next-white.svg' width={120} height={120} alt='logo' />
      {session?.user && (
        <div className='flex items-center gap-3'>
          <p className='text-white ml-2 hidden md:block'>
            Hello - <span className='text-red-500'>{session.user.name}!</span>
          </p>
          <Image src={session.user.image as string} width={32} height={32} alt='user' className='rounded-full' />
          <LogoutOutlined className='ml-2 text-red-500 cursor-pointer' onClick={() => signOut()} />
          <div className='ml-2'>
            <ModeToggle />
          </div>
          <div className='xl:hidden'>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <MenuOutlined />
                </MenubarTrigger>
                <MenubarContent className='flex flex-col  text-white'>
                  <MenubarItem>
                    <Link href='/' className={`${checkIActive('/') && 'text-red-500'}`}>
                      Home
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />

                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Last 30 days
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      This week
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Next week
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Release calendar
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Best of the year
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Popular in 2022
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      All time 250
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Platforms
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/stores' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Stores
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Collections
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Developers
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Action
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Strategy
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      RPG
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Shooter
                    </Link>
                  </MenubarItem>
                  <MenubarItem>
                    <Link href='/abc' className={theme === 'dark' ? 'text-white' : 'text-black'}>
                      Sports
                    </Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className={theme === 'dark' ? 'text-white' : 'text-black'}>Logout</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
