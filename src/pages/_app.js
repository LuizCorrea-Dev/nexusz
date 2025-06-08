import { useState, useEffect } from "react";
import "../styles/global.css";
import "../styles/home.module.css";
import "../styles/card.module.css";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ativa o loader apenas no client-side
    if (typeof window !== "undefined") {
      setLoading(true);

      // Apenas dispara o loader por 5s
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000); // 5 segundos pra não travar

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return <Component {...pageProps} />;
}
