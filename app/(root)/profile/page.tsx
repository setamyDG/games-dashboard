import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { User } from '@/actions/user.actions';
import { ChangeBackground } from '@/components/ChangeBackground/ChangeBackground';
import { UserCollection } from '@/components/UserCollection/UserCollection';
import { baseUrl } from '@/lib/utils';

const fetchUsers = async () => {
  const response = await fetch(`${baseUrl}/api/user`, {
    next: {
      tags: ['users'],
    },
  });

  if (!response.ok) {
    console.log('response', response);

    throw new Error('Something went wrong');
  }

  return response.json();
};

const ProfilePage = async () => {
  const session = await getServerSession();
  const users: User[] = await fetchUsers();

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
