import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getPlatforms } from '@/actions/platforms.actions';
import { PlatformsList } from '@/components';

const PlatformsPage = async () => {
  const platforms = await getPlatforms();
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <Image alt='gameIconPage' src='/game.svg' width={30} height={30} priority />
        <h1 className='headingText'>Platforms</h1>
      </div>
      <PlatformsList platforms={platforms} />
    </>
  );
};

export default PlatformsPage;
