import { getServerSession, type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmailAndPassword } from './useUserApi';
import { randomBytes, randomUUID } from 'crypto';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        return getUserByEmailAndPassword(email, password);
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
