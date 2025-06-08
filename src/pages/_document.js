import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Metal+Mania&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <div id="background-slide"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
