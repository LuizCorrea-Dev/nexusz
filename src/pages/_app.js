import { useState, useEffect } from "react";
import "../styles/global.css";
import "../styles/home.module.css";
import "../styles/card.module.css";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 12000); // fallback no tempo
    return () => clearTimeout(timer); // limpa timeout se desmontar
  }, []);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      {!loading && <Component {...pageProps} />}
    </>
  );
}
