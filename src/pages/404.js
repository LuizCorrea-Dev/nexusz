"use client";
import Link from "next/link";
import styles from "../styles/errorpages.module.css";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.errorBox}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Ops... Página não encontrada!</p>
        <Link href="/">
          <button className={styles.homeButton}>Voltar para Home</button>
        </Link>
      </div>
    </div>
  );
}
