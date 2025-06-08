import NextAuth from "next-auth";
import { OpenIDProvider } from "next-auth/providers/openid";

export default NextAuth({
  providers: [
    OpenIDProvider({
      id: "steam",
      name: "Steam",
      type: "openid",
      version: "2.0",
      scope: "openid",
      params: {
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to":
          process.env.NEXTAUTH_URL + "/api/auth/callback/steam",
        "openid.realm": process.env.NEXTAUTH_URL,
      },
      issuer: "https://steamcommunity.com/openid",
      clientId: process.env.STEAM_API_KEY,
      clientSecret: "unused", // Steam não usa secret
      profile(profile) {
        const steamID = profile.sub.split("/").pop();
        return {
          id: steamID,
          name: profile.personaname || "Steam User",
          image: profile.avatarfull,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
