// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
// Importe o Steam do novo pacote 'next-auth-steam'
import Steam from "next-auth-steam";

// O NextAuth espera req e res
export default async function auth(req, res) {
  return await NextAuth(req, res, {
    providers: [
      // Configure o provedor Steam usando o 'req'
      Steam(req, {
        clientSecret: process.env.STEAM_API_KEY, // Use sua variável de ambiente STEAM_API_KEY
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      // Estes callbacks são para processar os dados do perfil Steam
      // que o `next-auth-steam` já formata para você.
      async jwt({ token, account, profile }) {
        if (account?.provider === "steam" && profile) {
          // 'profile.id' é o steamid, 'profile.image' é o avatar, 'profile.name' é o nome
          token.steamid = profile.id;
          token.avatar = profile.image;
          token.name = profile.name;
        }
        return token;
      },
      async session({ session, token }) {
        // Atribui os dados do token para a sessão do usuário
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
    secret: process.env.NEXTAUTH_SECRET, // Não se esqueça do secret!
  });
}
