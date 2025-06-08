import { useState, useEffect } from "react";
import "../styles/global.css";
import "../styles/home.module.css";
import "../styles/card.module.css";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem("loadedOnce")) {
        setLoading(true);

        const timer = setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("loadedOnce", "true"); // Marca que já carregou uma vez
        }, 5500); // Tempo do loader + delay

        return () => clearTimeout(timer);
      } else {
        setLoading(false);
      }
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <Component {...pageProps} />;
}
