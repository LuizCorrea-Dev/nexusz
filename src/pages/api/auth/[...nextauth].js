import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Issuer } from "openid-client";

export default async function auth(req, res) {
  const steamIssuer = await Issuer.discover(
    "https://steamcommunity.com/openid"
  );

  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        id: "steam",
        name: "Steam",
        credentials: {},
        authorize: async (credentials) => {
          // Steam login logic handled automatically
          return null; // Steam redirects, no manual login
        },
      }),
    ],
    callbacks: {
      async signIn({ account, profile }) {
        return true; // Accept sign-in
      },
      async session({ session, token }) {
        session.steamId = token.sub; // Assign SteamID
        return session;
      },
      async jwt({ token }) {
        return token;
      },
    },
    pages: {
      signIn: "/auth/signin", // Optional: custom sign-in page
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
