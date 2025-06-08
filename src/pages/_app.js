import "../styles/home.module.css";
import "../styles/card.module.css";
import { SessionProvider } from "next-auth/react";
import "../styles/global.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
