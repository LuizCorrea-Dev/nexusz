import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardContent from "../components/CardContent";
import homeStyles from "../styles/home.module.css";
import RandomCharacterAnimation from "../utils/RandomCharacterAnimation";

export default function Home() {
  useEffect(() => {
    const animation = new RandomCharacterAnimation({
      d_element: "#matrixHome",
      d_kerning: 8000,
      d_min: 25,
      d_max: 100,
    });
    animation.start();
    setTimeout(() => animation.stop(), 3000);
  }, []); // somente no carregamento

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
