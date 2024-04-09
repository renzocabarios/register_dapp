"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setmounted] = useState(false);

  useEffect(() => {
    setmounted(true);
  }, [setmounted]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider endpoint={clusterApiUrl("devnet")}>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>{mounted && children}</WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
