"use client";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SOLANA_API_URL, WALLETS } from "@/config";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Navbar } from "@/components/layout";
require("@solana/wallet-adapter-react-ui/styles.css");
const inter = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [rendered, setrendered] = useState(false);

  useEffect(() => {
    setrendered(true);
  }, []);

  return (
    <html lang="en">
      <GoogleAnalytics trackPageViews />
      <head>
        <title>SANAOL! (uwu)</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
        <meta
          name="google-site-verification"
          content="Zdo0zkSF9StEhWYQspDP0QPa41axcPIvC75nJxydi9k"
        />
        <meta
          name="description"
          content="Don't just dream, friend! Level up your future! #SANAOL for a better tomorrow."
        />

        <meta property="og:url" content="https://sanaol.xyz/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SANAOL!" />
        <meta
          property="og:description"
          content="Don't just dream, friend! Level up your future! #SANAOL for a better tomorrow."
        />
        <meta
          property="og:image"
          content="https://assets-1962.ap-south-1.linodeobjects.com/sanaol-main.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="sanaol.xyz" />
        <meta property="twitter:url" content="https://sanaol.xyz/" />
        <meta name="twitter:title" content="SANAOL!" />
        <meta
          name="twitter:description"
          content="Don't just dream, friend! Level up your future! #SANAOL for a better tomorrow."
        />
        <meta
          name="twitter:image"
          content="https://assets-1962.ap-south-1.linodeobjects.com/sanaol-main.jpg"
        />
      </head>
      <body className={`${inter.className} vheight`}>
        <ConnectionProvider endpoint={SOLANA_API_URL}>
          <WalletProvider wallets={WALLETS} autoConnect>
            <WalletModalProvider>
              {/* <WalletMultiButton />
              <WalletDisconnectButton /> */}
              {rendered ? children : <></>}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
