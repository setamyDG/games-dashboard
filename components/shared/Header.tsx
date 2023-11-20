'use client';

import { Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/navbar';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Divider } from '@nextui-org/react';
import { User } from '@nextui-org/user';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { links } from '@/utils/links';

export const Header = (): JSX.Element => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentMonth = new Date().toLocaleString('en-GB', { month: 'long' });
  const navigationLinks = links(currentMonth);
  const router = useRouter();
  const pathname = usePathname();

  const titleIcons = {
    'Last 30 days': <Image alt='bestOfTheYearIcon' src='/star.svg' width={24} height={24} priority />,
    'This week': <Image alt='bestOfTheYearIcon' src='/fire.svg' width={24} height={24} priority />,
    'Next week': <Image alt='bestOfTheYearIcon' src='/next-week.svg' width={24} height={24} priority />,
    'Release calendar': <Image alt='bestOfTheYearIcon' src='/calendar.svg' width={24} height={24} priority />,
    'Best of the year': <Image alt='bestOfTheYearIcon' src='/crown.svg' width={24} height={24} priority />,
    'Popular in 2022': <Image alt='bestOfTheYearIcon' src='/chart.svg' width={24} height={24} priority />,
    'All time top 250': <Image alt='bestOfTheYearIcon' src='/win.svg' width={24} height={24} priority />,
    Platforms: <Image alt='bestOfTheYearIcon' src='/game.svg' width={24} height={24} priority />,
    Profile: <Image alt='Profile' src='/game.svg' width={24} height={24} priority />,
  };

  const renderItems = () => (
    <>
      {navigationLinks.map(({ title, children }) => {
        const firstWordInTitle = title.split(' ')[0].toLowerCase();
        return (
          <NavbarItem key={title}>
            <Dropdown showArrow>
              <DropdownTrigger>
                <Button
                  color={pathname.includes(firstWordInTitle) ? 'danger' : 'default'}
                  disableRipple
                  className='p-0 bg-transparent data-[hover=true]:bg-transparent'
                  endContent={<ChevronDownIcon />}
                  variant='light'
                >
                  {title}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                color='danger'
                variant='shadow'
                aria-label={title}
                className='w-[370px]'
                itemClasses={{
                  base: 'gap-4',
                }}
              >
                {children.map((link) => (
                  <DropdownItem
                    key={link.name}
                    description={link.description}
                    startContent={titleIcons[link.name as keyof typeof titleIcons]}
                    onClick={() => router.push(link.path)}
                    className={
                      pathname === link.path
                        ? 'text-[rgb(243,16,97)] text-sm'
                        : 'text-white hover:text-[rgb(243,16,97)] text-sm'
                    }
                  >
                    {link.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        );
      })}
    </>
  );

  const renderMobileItems = () => (
    <>
      {navigationLinks.map(({ title, children }) => (
        <NavbarMenuItem key={title} className='flex justify-center'>
          <Dropdown showArrow>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className='p-0 bg-transparent data-[hover=true]:bg-transparent'
                  endContent={<ChevronDownIcon />}
                  variant='light'
                >
                  {title}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              color='danger'
              variant='shadow'
              aria-label={title}
              className='w-[350px]'
              itemClasses={{
                base: 'gap-4',
              }}
            >
              {children.map((link) => (
                <DropdownItem
                  key={link.name}
                  description={link.description}
                  startContent={titleIcons[link.name as keyof typeof titleIcons]}
                  onClick={() => router.push(link.path)}
                >
                  {link.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
      ))}
    </>
  );

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className='px-0 md:px-8 z-50'>
      <NavbarContent className='flex md:hidden' justify='start'>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>
      <NavbarContent className='hidden md:flex gap-4' justify='center'>
        {renderItems()}
        <NavbarItem>
          <Link
            className={
              pathname === '/' ? 'text-[rgb(243,16,97)] text-sm' : 'text-white hover:text-[rgb(243,16,97)] text-sm'
            }
            href='/'
          >
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
      {session?.user && (
        <NavbarContent justify='end'>
          <NavbarItem className='hidden md:flex'>
            <Dropdown placement='bottom-start'>
              <DropdownTrigger>
                <User
                  as='button'
                  avatarProps={{
                    isBordered: true,
                    src: session?.user?.image || '/game.svg',
                  }}
                  className='transition-transform'
                  description={session?.user?.email}
                  name={session?.user?.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label='User Actions' variant='flat'>
                <DropdownItem key='settings'>
                  <Link href='/profile'>Profile</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Button onClick={() => signOut()} color='danger' href='#' variant='flat'>
              Sign Out
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu className='hidden md:block items-center w-full z-[999] text-center'>
        {renderMobileItems()}
        <Divider className='my-4' />
        <NavbarItem className='flex flex-col'>
          <Link
            className={
              pathname === '/'
                ? 'text-[rgb(243,16,97)] text-sm mt-4'
                : 'text-white hover:text-[rgb(243,16,97)] text-sm mt-4'
            }
            href='/'
          >
            Home
          </Link>
          <Link
            className={
              pathname === '/profile'
                ? 'text-[rgb(243,16,97)] text-sm mt-4'
                : 'text-white hover:text-[rgb(243,16,97)] text-sm mt-4'
            }
            href='/profile'
          >
            Profile
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};
