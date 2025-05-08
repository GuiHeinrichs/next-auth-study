import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async signIn({ user, account, profile }) {
      // Verifica se o usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      // Se existe, mas o provider é diferente, adiciona um novo método de login
      if (existingUser) {
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account?.provider as string,
              providerAccountId: account?.providerAccountId as string,
            },
          },
          update: {},
          create: {
            userId: existingUser.id,
            provider: account?.provider as string,
            providerAccountId: account?.providerAccountId as string,
            type: account?.type as string,
            access_token: account?.access_token as string,
            token_type: account?.token_type as string,
            id_token: account?.id_token as string,
            refresh_token: account?.refresh_token as string,
            expires_at: account?.expires_at as number,
          },
        });
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
