import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { verifyPassword } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        console.log({ credentials });
        let user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          // select: { name: true, id: true, email: true },
        });

        if (!user) return null;
        let valid = await verifyPassword(credentials.password, user.password);

        if (!valid) return;
        delete user.password;
        // console.log({ user });

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
  secret: 'test@helloworld',

  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (typeof user !== typeof undefined) token.user = user;
      console.log({ token });
      return token;
    },
    session: async ({ session, user, token }) => {
      token?.user && (session.user = token.user);
      console.log({ session });
      return session;
    },
  },

  pages: {
    signIn: '/signin',
  },
  theme: {
    colorScheme: 'dark', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code
    logo: '', // Absolute URL to image
    buttonText: '', // Hex color code
  },
});
