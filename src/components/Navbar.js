import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import SlideBG from "./SlideBG";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "dayz" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <SlideBG theme={theme} />
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/NEXUS_Z-LOGO.png" alt="NEXUS Z Logo" />
        </div>
        <div className={styles.title}>NΣXUS Z</div>
        <div className={styles.burger} onClick={toggleMenu}>
          {menuOpen ? "✖" : "☰"}
        </div>
        <ul className={`${styles.links} ${menuOpen ? styles.showMenu : ""}`}>
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
          <li>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {theme === "dark" ? "☠️ DayZ" : "🌙 Dark"}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
