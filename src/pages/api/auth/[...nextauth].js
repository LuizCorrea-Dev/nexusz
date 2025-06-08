import NextAuth from "next-auth";
import SteamProvider from "next-auth-steam";

export default NextAuth({
  providers: [
    SteamProvider({
      clientId: process.env.STEAM_API_KEY,
      clientSecret: "unused", // Steam não precisa de clientSecret
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
        token.picture = profile.avatar; // Pega o avatar
      }
      return token;
    },
  },
});
