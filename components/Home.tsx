"use client";
import { Button } from "./index";
import { POST } from "@/config";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import base58 from "bs58";
import { useEffect, useState } from "react";

import { Navbar } from "./layout";

export default function Home() {
  const { publicKey, signMessage, connected } = useWallet();
  const [joined, setjoined] = useState(false);

  useEffect(() => {
    const temp = localStorage.getItem("joined");
    if (temp == "true") setjoined(true);
  }, [joined]);

  const join = async () => {
    if (connected && signMessage) {
      const message = `SANAOL!`;
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = base58.encode(await signMessage(encodedMessage));

      await POST("sanaol", {
        wallet: publicKey?.toString(),
        signedMessage,
      });
      localStorage.setItem("joined", "true");
      setjoined(true);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col justify-center h-[75vh] items-center w-full">
        <div
          className={`flex flex-col gap-4 justify-center items-center md:items-start p-5 max-w-[35rem] `}
        >
          <div className="text-center md:text-left">
            <p className="md:text-3xl text-2xl font-bold">
              Don&apos;t just dream, friend!
            </p>
            <p className="md:text-3xl text-2xl font-bold">
              Level up your future! #SANAOL
            </p>
            <p className="md:text-3xl text-2xl font-bold">
              for a better tomorrow.
            </p>
          </div>
          {joined ? (
            <p className="md:text-xl text-center md:text-left">
              Thank you for joining the movement! Don&apos;t forget to follow
              our social media for the next steps!
            </p>
          ) : (
            <p className="md:text-xl text-center md:text-left">
              Just connect your wallet to join the waitlist.
            </p>
          )}
          {joined ? (
            <></>
          ) : connected ? (
            <Button
              disabled={joined}
              onClick={() => {
                join();
              }}
            >
              Join the waitlist
            </Button>
          ) : (
            <Button
              disabled={joined}
              onClick={() => {
                join();
              }}
            >
              <WalletMultiButton />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
