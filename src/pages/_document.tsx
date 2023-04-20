import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="description" content="An online pharma store" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body className="bg-slate-50 font-inter text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
