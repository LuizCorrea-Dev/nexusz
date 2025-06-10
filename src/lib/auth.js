import SteamProvider from "@kenjiow/next-auth-steam";

export const authOptions = {
  providers: [
    SteamProvider({
      clientSecret: process.env.STEAM_API_KEY,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "steam" && profile) {
        token.steamid = profile.steamid;
        token.avatar = profile.avatarfull;
        token.name = profile.personaname;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.steamid;
      session.user.name = token.name;
      session.user.image = token.avatar;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};
