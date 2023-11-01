/* eslint-disable react-refresh/only-export-components */
import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDb } from '@/lib/mongodb';
import User from '@/models/user.model';

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        try {
          connectToDb();
          const user = await User.findOne({ email });
          const passwordsMatch = await bcrypt.compare(password, user.password);

          console.log('User: ', user);

          if (!user || user === null || !passwordsMatch) {
            return null;
          } else {
            return user;
          }
        } catch (error) {
          console.log('Error: ', error);
        }
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
