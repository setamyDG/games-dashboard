'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
  session?: SessionProviderProps['session'];
};

export const NextAuthProvider = ({ children, session }: Props) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);
