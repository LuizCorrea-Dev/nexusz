"use client";
import { signIn } from "next-auth/react";
import styles from "../../styles/signin.module.css";

export default function SignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>🧬 Nexus Z - Login</h1>
        <p className={styles.subtitle}>Sobreviva. Descubra. Conquiste.</p>
        <button
          onClick={() => signIn("credentials", { callbackUrl: "/" })}
          className={styles.steamButton}
        >
          Login com Steam
        </button>
      </div>
    </div>
  );
}
