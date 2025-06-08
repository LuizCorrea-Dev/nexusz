import NextAuth from "next-auth";
import SteamProvider from "next-auth-steam"; // Ou o nome correto que você instalou

export default NextAuth({
  providers: [
    SteamProvider({
      clientSecret: "unused",
      clientID: process.env.STEAM_API_KEY,
      issuer: "https://steamcommunity.com/openid",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
