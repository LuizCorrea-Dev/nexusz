import SteamProvider, { STEAM_PROVIDER_ID } from "@hyperplay/next-auth-steam";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SteamProvider({
      nextAuthUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback`,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === STEAM_PROVIDER_ID && profile) {
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

export const authOptionsWithRequest = (request) => {
  return {
    ...authOptions,
    providers: [
      ...authOptions.providers.filter(({ id }) => id !== STEAM_PROVIDER_ID),
      SteamProvider(
        {
          nextAuthUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback`,
          // Opcionalmente, adicione 'onUserInfoRequest' aqui para buscar dados do perfil Steam
          // de forma segura no backend, usando sua STEAM_API_KEY.
          // Exemplo:
          // onUserInfoRequest: async (ctx) => {
          //   const response = await fetch(
          //     `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${ctx.tokens.steamId}`
          //   );
          //   const data = await response.json();
          //   return data.response.players[0]; // Retorna o objeto do perfil do Steam
          // },
        },
        request
      ),
    ],
  };
};
