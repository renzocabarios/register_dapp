import { API_URL } from "@/env";
import { BaseSignInMessageSignerWalletAdapter } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import axios from "axios";

export const AXIOS_INSTANCE = axios.create({
  baseURL: API_URL,
});

export async function GET(url: string) {
  return await AXIOS_INSTANCE.get(url);
}

export async function POST<T>(url: string, body: T) {
  return await AXIOS_INSTANCE.post(url, body);
}

export const SOLANA_API_URL: string = clusterApiUrl("mainnet-beta");

export const WALLETS: BaseSignInMessageSignerWalletAdapter[] = [];
