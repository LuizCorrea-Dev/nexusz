import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import SlideBG from "./SlideBG";
import RandomCharacterAnimation from "../utils/RandomCharacterAnimation";

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
    triggerAnimation(); // opcional: anima no abrir do menu
  };

  const triggerAnimation = () => {
    const titleElement = document.getElementById("matrixNavbar");
    if (!titleElement) return;

    titleElement.classList.add(styles.inactiveMatrix);

    const animation = new RandomCharacterAnimation({
      d_element: "#matrixNavbar",
      d_kerning: 8000,
      d_min: 25,
      d_max: 100,
    });
    animation.start();
    setTimeout(() => {
      titleElement.classList.remove(styles.inactiveMatrix);
      titleElement.classList.add(styles.matrixActive);
    }, 300);

    setTimeout(() => {
      animation.stop();
      titleElement.classList.remove(styles.matrixActive);
    }, 3000);
  };

  return (
    <>
      <SlideBG theme={theme} />
      <nav className={styles.navbar}>
        <div className={styles.logoTitle}>
          <img
            src="/NEXUS_Z-LOGO.png"
            alt="NEXUS Z Logo"
            className={styles.logo}
          />
          <span id="matrixNavbar" className={styles.title}>
            NΣXUS Z
          </span>
        </div>

        <div className={styles.burger} onClick={toggleMenu}>
          {menuOpen ? "✖" : "☰"}
        </div>

        <ul className={`${styles.links} ${menuOpen ? styles.active : ""}`}>
          <li>
            <Link
              href="/"
              onMouseEnter={triggerAnimation}
              onFocus={triggerAnimation}
              onTouchStart={triggerAnimation}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/server"
              onMouseEnter={triggerAnimation}
              onFocus={triggerAnimation}
              onTouchStart={triggerAnimation}
            >
              Servidor
            </Link>
          </li>
          <li>
            <Link
              href="/lore"
              onMouseEnter={triggerAnimation}
              onFocus={triggerAnimation}
              onTouchStart={triggerAnimation}
            >
              Lore
            </Link>
          </li>
          <li>
            <Link
              href="/store"
              onMouseEnter={triggerAnimation}
              onFocus={triggerAnimation}
              onTouchStart={triggerAnimation}
            >
              Loja
            </Link>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              onMouseEnter={triggerAnimation}
              onFocus={triggerAnimation}
              onTouchStart={triggerAnimation}
              className={styles.themeToggle}
            >
              {theme === "dark" ? "☠️ DayZ" : "🌙 Dark"}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
