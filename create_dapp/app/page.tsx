"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { useHomeStore } from "@/lib/zustand/home.state";
import RegisterForm from "./(forms)/register-form";

export default function Home() {
  const { registered, getUser, setLoading } = useHomeStore();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    function getProvider() {
      if (wallet) {
        return new AnchorProvider(connection, wallet, {});
      }
      return null;
    }
    const provider = getProvider();
    if (publicKey && provider) {
      setLoading(true);
      getUser({ userPublicKey: publicKey, provider });
    }
  }, [connection, getUser, publicKey, setLoading, wallet]);

  return (
    <main className="flex flex-col min-h-screen bg-slate-200">
      <div className="w-full h-[10vh] p-2 flex justify-end items-center">
        <WalletMultiButton />
      </div>

      <div className="min-h-[90vh] flex justify-center items-center">
        {registered ? (
          <p className="text-2xl font-semibold">You are already registered</p>
        ) : (
          <RegisterForm />
        )}
      </div>
    </main>
  );
}
