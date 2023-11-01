'use client';

import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Chip } from '@nextui-org/chip';
import { Divider } from '@nextui-org/divider';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Props } from './PlatformCard.types';

type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export const PlatformCard = ({ platform }: Props): JSX.Element => {
  const randomColor = (): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' => {
    const colors: Color[] = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'];
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  };

  return (
    <Card>
      <CardHeader className='justify-between'>
        <div className='flex gap-5'>
          <Avatar isBordered radius='full' size='md' src={platform.image_background as string} />
          <div className='flex flex-col gap-1 items-start justify-center'>
            <h4 className='text-small font-semibold leading-none text-default-600'>Games: {platform.games_count}</h4>
            <h5 className='text-small tracking-tight text-red-500'>{platform.name}</h5>
          </div>
        </div>
        <Button endContent={<ExternalLinkIcon />} radius='full' size='sm' onPress={() => {}}>
          See more
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className='px-3 py-2 text-small text-default-400'>
        <p>Most popular games</p>
        <div className='flex gap-4'>
          {platform.games?.map((game) => (
            <Link key={game.id} href={`/games/${game.slug}`}>
              <Chip key={game.id} className='my-2' color={randomColor()}>
                {game.name}
              </Chip>
            </Link>
          ))}
        </div>
        <span className='pt-2'>#PlayOn{platform.name}</span>
      </CardBody>
      <CardFooter className='gap-3'>
        {platform?.year_end && (
          <div className='flex gap-1'>
            <p className='font-semibold text-default-400 text-small'>{platform.year_end}</p>
            <p className='text-default-400 text-small'>Death</p>
          </div>
        )}
        {platform?.year_start && (
          <div className='flex gap-1'>
            <p className='font-semibold text-default-400 text-small'>{platform.year_start}</p>
            <p className='text-default-400 text-small'>Release</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
