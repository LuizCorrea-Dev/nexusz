"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/loginbuttonsteam.module.css";

export default function LoginButtonSteam() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className={styles.loggedInBox}>
        <img src={session.user.image} alt="Avatar" className={styles.avatar} />
        <p>Bem-vindo, {session.user.name || "Usuário Steam"}</p>
        <button className={styles.logoutButton} onClick={() => signOut()}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("steam")} className={styles.steamButton}>
      Login com Steam
    </button>
  );
}
