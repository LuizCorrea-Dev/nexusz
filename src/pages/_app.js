import "../styles/global.css";
import "../styles/home.module.css";
import "../styles/card.module.css";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento, ou espere algum evento real
    setTimeout(() => setLoading(false), 12000); // 12 segundos
  }, []);

  if (loading) {
    return <Loader onFinish={() => setLoading(false)} />;
  }

  return <Component {...pageProps} />;
}
