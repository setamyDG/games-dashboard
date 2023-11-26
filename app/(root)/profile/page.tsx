import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { fetchUsers } from '@/actions/user.actions';
import { ChangeBackground } from '@/components/ChangeBackground/ChangeBackground';
import { UserCollection } from '@/components/UserCollection/UserCollection';

const ProfilePage = async () => {
  const session = await getServerSession();
  const users = await fetchUsers();

  if (!session) {
    redirect('/sign-in');
  }

  const user = users.filter((user) => user.email === (session?.user?.email as string));

  return (
    <>
      <ChangeBackground user={user[0]} />
      <UserCollection user={user[0]} />
    </>
  );
};

export default ProfilePage;
