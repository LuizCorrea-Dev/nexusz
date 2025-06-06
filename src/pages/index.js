import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardContent from "../components/CardContent";
import homeStyles from "../styles/Home.module.css";

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
          <h1 className={homeStyles.title}>NΣXUS Z</h1>
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
