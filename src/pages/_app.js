import "../styles/global.css"; // <-- global.css aqui
import "../styles/Home.module.css"; // CSS Modules continuam normais
import "../styles/Card.module.css"; // Import específico continua

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
