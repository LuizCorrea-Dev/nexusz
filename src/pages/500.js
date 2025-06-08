"use client";
import Link from "next/link";
import styles from "../styles/errorpages.module.css";

export default function Custom500() {
  return (
    <div className={styles.container}>
      <div className={styles.errorBox}>
        <h1 className={styles.title}>500</h1>
        <p className={styles.subtitle}>
          Erro interno do servidor. Tente novamente mais tarde.
        </p>
        <Link href="/">
          <button className={styles.homeButton}>Voltar para Home</button>
        </Link>
      </div>
    </div>
  );
}
