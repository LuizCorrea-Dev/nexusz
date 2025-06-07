import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import SlideBG from "./SlideBG";

export default function Navbar() {
  const [theme, setTheme] = useState("discord");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "discord";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "discord" ? "dayz" : "discord";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <SlideBG theme={theme} /> {/* Chama o background dinâmico */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/NEXUS_Z-LOGO.png" alt="NEXUS Z Logo" />
          <span className={styles.title}>NΣXUS Z</span>
        </div>
        <ul className={styles.links}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/server">Servidor</Link>
          </li>
          <li>
            <Link href="/lore">Lore</Link>
          </li>
          <li>
            <Link href="/store">Loja</Link>
          </li>
        </ul>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === "discord" ? "☠️ DayZ" : "💬 Discord"}
        </button>
      </nav>
    </>
  );
}
