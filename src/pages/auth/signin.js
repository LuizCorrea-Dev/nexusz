"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../../styles/signin.module.css";
import { useEffect } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      // Log SteamID
      console.log(
        "✅ Logado com SteamID:",
        session.user?.id || "ID não disponível"
      );
    } else if (status === "unauthenticated") {
      console.error("❌ Usuário não está logado!");
    }
  }, [session, status]);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>🧬 Nexus Z - Login</h1>
        <p className={styles.subtitle}>Sobreviva. Descubra. Conquiste.</p>

        {session ? (
          <>
            <img
              src={session.user?.image}
              alt="Avatar Steam"
              className={styles.avatar}
            />
            <p className={styles.username}>{session.user?.name}</p>
            <button
              className={`${styles.steamButton} ${styles.logged}`}
              onClick={() => signOut()}
            >
              Deslogar
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("steam", { callbackUrl: "/" })}
            className={styles.steamButton}
          >
            Login com Steam
          </button>
        )}
      </div>
    </div>
  );
}
