import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardContent from "../components/CardContent";
import homeStyles from "../styles/home.module.css";
import RandomCharacterAnimation from "../utils/RandomCharacterAnimation";

export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const titleElement = document.getElementById("matrixHome");
      if (!titleElement) return;

      const originalText = "NΣXUS Z";

      titleElement.classList.add(homeStyles.inactiveMatrix);

      const animation = new RandomCharacterAnimation({
        d_element: "#matrixHome",
        d_kerning: 8000,
        d_min: 25,
        d_max: 100,
      });

      animation.start();

      titleElement.classList.add(homeStyles.glitch);

      setTimeout(() => {
        titleElement.classList.remove(homeStyles.inactiveMatrix);
        titleElement.classList.add(homeStyles.matrixActive);
      }, 300);

      setTimeout(() => {
        titleElement.classList.remove(homeStyles.glitch); // Remove glitch
      }, 1000);

      setTimeout(() => {
        animation.stop();

        // 🔥 Força resetar o texto correto:
        titleElement.innerHTML = originalText;
        titleElement.classList.remove(homeStyles.matrixActive);
      }, 3000);
    }
  }, [theme]);

  return (
    <>
      <Navbar />
      <main className={homeStyles.main}>
        <div className={homeStyles.hero}>
          <img
            src="/NEXUS_Z-LOGO.png"
            alt="NEXUS Z Logo"
            className={homeStyles.logo}
          />
          <h1 className={homeStyles.title} id="matrixHome">
            NΣXUS Z
          </h1>
          <p className={homeStyles.tagline}>
            "No fim, a esperança não morreu. Ela apenas mudou de forma."
          </p>
        </div>
        <div className={homeStyles.cardsContainer}>
          <CardContent />
        </div>
      </main>

      <Footer />
    </>
  );
}
