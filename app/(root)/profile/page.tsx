import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';

const ProfilePage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <>
      <div className='flex gap-8 items-center'>
        <h1 className='headingText'>Collection of favorite games</h1>
      </div>
    </>
  );
};

export default ProfilePage;
