import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getPlatforms } from '@/actions/platforms.actions';
import { PlatformsList } from '@/components/shared/PlatformsList/PlatformsList';

const Platforms = async () => {
  const platforms = await getPlatforms();
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <Image alt='homeIcon' src='/game.svg' width={40} height={40} />
        <h1 className='headingText'>Platforms</h1>
      </div>
      <PlatformsList platforms={platforms} />
    </>
  );
};

export default Platforms;
