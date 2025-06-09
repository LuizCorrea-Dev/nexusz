// Configuração NextAuth Steam ✅
import SteamProvider from "@kenjiow/next-auth-steam";

export const authOptions = {
  providers: [
    SteamProvider({
      clientSecret: process.env.STEAM_SECRET,
      callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/steam`,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "steam" && profile) {
        token.steam = profile;
      }
      return token;
    },
    async session({ session, token }) {
      if ("steam" in token) {
        session.user.steam = token.steam;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};
