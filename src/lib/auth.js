import Steam from "next-auth-steam";

export const authOptions = (req) => ({
  providers: [
    Steam(req, {
      clientSecret: process.env.STEAM_API_KEY,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "steam" && profile) {
        token.steamid = profile.id;
        token.avatar = profile.image;
        token.name = profile.name;
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
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
