import axios from "axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Cookies from "js-cookie";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOption: NextAuthOptions = {
  pages: {
    signIn: "/register",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.id_token = account.id_token;
      }

      console.log("token>>>", token);
      if (process.env.NODE_ENV === "production") {
        Cookies.set("token", (token as any).id_token, {
          domain: "binabakat.id",
        });
      } else {
        Cookies.set("token", (token as any).id_token);
      }
      return token;
    },
    async session({ session, token }) {
      // session.id_token = token.id_token;
      // session.user = token.user;
      console.log("session>>>", session);
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const res = await axios
          // .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/google`,
          // // {
          // //   google_token: account.access_token,
          // // }j
          // )
          .post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/google`,
            {},
            { headers: { Authorization: `Bearer ${account.id_token}` } }
          )
          .then((res) => {
            console.log("data after signin", res.data);
            return res.data;
          })
          .catch((err) => console.log("error after signin", err));

        if (!res.data) return false;

        return res;
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOption);
export default handler;
