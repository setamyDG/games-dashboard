import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { getPlatforms } from '@/actions/platforms.actions';
import PlatformsList from '@/components/shared/PlatformsList/PlatformsList';

const Platforms = async () => {
  const platforms = await getPlatforms();
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <h1 className='headingText'>Platforms</h1>
      <PlatformsList platforms={platforms} />
    </>
  );
};

export default Platforms;
