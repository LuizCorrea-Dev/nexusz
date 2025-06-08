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
          sessionStorage.setItem("loadedOnce", "true"); // 🔥 marca que já carregou uma vez
        }, 5000); // 5 segundos

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
