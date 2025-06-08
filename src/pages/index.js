import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardContent from "../components/CardContent";
import homeStyles from "../styles/home.module.css";
import RandomCharacterAnimation from "../utils/RandomCharacterAnimation";

export default function Home() {
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
          {/* 🔥 Só Matrix aqui */}
          <RandomCharacterAnimation targetId="matrixHome" />
        </div>
        <div className={homeStyles.cardsContainer}>
          <CardContent />
        </div>
      </main>
      <Footer />
    </>
  );
}

// 🔥 ESSENCIAL — impedir exportação estática
export async function getServerSideProps() {
  return {
    props: {}, // só isso já impede o export
  };
}
