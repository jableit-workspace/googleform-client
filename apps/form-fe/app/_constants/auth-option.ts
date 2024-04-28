import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

const createProvider = <T extends Function>(
  Provider: T,
  clientKey: string,
  secretKey: string,
) => {
  return Provider({
    clientId: process.env[clientKey],
    clientSecret: process.env[secretKey],
  });
};

// ! 추후 어뎁터 연결
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 60,
    updateAge: 6 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    createProvider(GoogleProvider, "GOOGLE_CLIENT_KEY", "GOOGLE_SECRET_KEY"),
    createProvider(KakaoProvider, "KAKAO_CLIENT_KEY", "KAKAO_SECRET_KEY"),
    createProvider(NaverProvider, "NAVER_CLIENT_KEY", "NAVER_SECRET_KEY"),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        return { ...token, ...user, sns: account.provider };
      }
      return token;
    },
    async session({ token, session }: any) {
      session = { ...token };
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (user === null) return false;
      try {
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect", url, baseUrl);
      return baseUrl;
    },
  },
};
