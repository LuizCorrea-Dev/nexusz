import NextAuth from "next-auth";
import SteamProvider from "steam-next-auth";

export default NextAuth({
  providers: [
    SteamProvider({
      clientId: process.env.STEAM_API_KEY,
      clientSecret: "unused", // Steam OpenID não usa secret
      issuer: "https://steamcommunity.com/openid",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.id = token.sub;
      session.avatar = token.picture;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "steam" && profile) {
        token.picture = profile.avatar;
      }
      return token;
    },
  },
});
